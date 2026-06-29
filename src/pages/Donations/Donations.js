import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import './Donations.css';

// Payment Information - Mandal committee can easily update these details
const PAYMENT_INFO = {
  upiId: "dongricharaja@upi",
  gpayNumber: "9876543210"
};

const Donations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [donorInfo, setDonorInfo] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    // Validation
    if (!donorInfo.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    
    // Indian mobile number validation
    const phoneTrimmed = donorInfo.phone.trim();
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(phoneTrimmed)) {
      toast.error("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    // Optional email validation
    const emailTrimmed = donorInfo.email.trim();
    if (emailTrimmed) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    // Load configurations from environment variables
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    const razorpayKeyId = process.env.REACT_APP_RAZORPAY_KEY_ID;

    // Verify window.Razorpay SDK is loaded from index.html script tag
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Please refresh the page and try again.");
      return;
    }

    // Set processing state and display loading toast
    setIsProcessing(true);
    const toastId = toast.loading("Initializing secure payment...");

    try {
      // 1. Create order ID via backend endpoint
      const response = await fetch(`${backendUrl}/api/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: numericAmount })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('[Razorpay] Order creation failed:', response.status, errorBody);
        throw new Error("Failed to create order from backend server.");
      }

      const orderData = await response.json();

      // Determine key to use: prefer dynamic backend-supplied keyId, fallback to frontend env variable
      const activeKey = orderData.keyId || razorpayKeyId;

      // DEV: Log details for verification (active only in local development)
      if (process.env.NODE_ENV === 'development') {
        console.log('[Razorpay] Frontend env key:', razorpayKeyId);
        console.log('[Razorpay] Backend supplied key:', orderData.keyId);
        console.log('[Razorpay] Key ID selected for checkout:', activeKey);
        console.log('[Razorpay] Order details:', orderData);
      }

      // Validate the key is populated and not a placeholder
      if (!activeKey || activeKey === 'rzp_test_placeholder') {
        toast.error("Razorpay is not configured correctly on either the frontend or backend.");
        console.error('[Razorpay] No valid key ID found. Active key is missing or set to placeholder.');
        setIsProcessing(false);
        toast.dismiss(toastId);
        return;
      }

      // 2. Open Razorpay checkout options
      const options = {
        key: activeKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Dongri Cha Raja",
        description: "Donation for Ganeshotsav",
        order_id: orderData.orderId,
        prefill: {
          name: donorInfo.name,
          contact: phoneTrimmed
        },
        theme: {
          color: "#8B0000" // Premium royal red/crimson theme matching website variables
        },
        handler: async function (razorpayResponse) {
          toast.loading("Verifying payment signature...", { id: toastId });
          
          try {
            // 3. Cryptographically verify signature and save details on the backend
            const verificationResponse = await fetch(`${backendUrl}/api/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                donorName: donorInfo.name.trim(),
                donorPhone: phoneTrimmed,
                donorEmail: emailTrimmed,
                amountPaid: numericAmount
              })
            });

            if (!verificationResponse.ok) {
              const errorText = await verificationResponse.text();
              console.error("[Razorpay] Verification endpoint returned error:", errorText);
              throw new Error("Payment signature verification failed.");
            }

            const data = await verificationResponse.json();

            // DEV: Log verification response and donation details (active only in local development)
            if (process.env.NODE_ENV === 'development') {
              console.log("Verification Response:", data);
              console.log("Donation Object:", data.donation);
            }

            // Defensive check: validate response status and donation object existence
            if (data.status !== 'ok' || !data.donation) {
              throw new Error(data.error || "Backend did not return donation details.");
            }

            // 4. Persist receipt number for refresh-safety, then navigate to success page
            sessionStorage.setItem('dcr_last_receipt', data.donation.receiptNo);
            toast.success("Payment Successful! Thank you for your support.", { id: toastId });
            navigate('/donation-success', {
              state:   { donation: data.donation },
              replace: true,  // prevents Back button from re-opening checkout
            });
          } catch (verifyError) {
            console.error("Signature verification error:", verifyError);
            toast.error("Payment verification failed. Please contact trust committee.", { id: toastId });
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.dismiss(toastId);
            toast.info("Payment cancelled.");
          }
        }
      };

      // DEV: Log checkout options before opening Razorpay
      if (process.env.NODE_ENV === 'development') {
        console.log('[Razorpay] Checkout options:', {
          key: options.key,
          amount: options.amount,
          currency: options.currency,
          order_id: options.order_id,
          name: options.name
        });
      }

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (paymentFailedResponse) {
        setIsProcessing(false);
        toast.dismiss(toastId);
        toast.error(`Payment failed: ${paymentFailedResponse.error.description || 'Reason unknown'}`);
      });

      rzp.open();
      // Dismiss the initializing loader once popup mounts
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Razorpay initiation error:", error);
      setIsProcessing(false);
      toast.dismiss(toastId);
      toast.error("Payment initialization failed. Ensure backend server is running.");
    }
  };



  return (
    <>
      <Helmet>
        <title>Online Donations | Dongri Cha Raja</title>
        <meta name="description" content="Support the community drives of Dongri Cha Raja. Secure online donations with instant 80G tax exemption receipts." />
      </Helmet>

      <main className="donations-page fade-in">
        {/* ── Banner ── */}
        <section className="committee-banner" aria-label="Donations Banner">
          <div className="committee-banner__mandala" aria-hidden="true">
            <span className="mandala-ring mandala-ring--outer" />
            <span className="mandala-ring mandala-ring--mid" />
            <span className="mandala-ring mandala-ring--inner" />
          </div>
          <div className="committee-banner__ornament top-left" aria-hidden="true">❋</div>
          <div className="committee-banner__ornament top-right" aria-hidden="true">❋</div>
          <div className="container">
            <p className="committee-banner__marathi-year" lang="mr">सहकार्य</p>
            <h1 className="committee-banner__title">Online Donations</h1>
            <p className="committee-banner__marathi-title" lang="mr">ऑनलाईन देणगी</p>
            <div className="committee-banner__divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-gem">✦</span>
              <span className="divider-line" />
            </div>
            <p className="committee-banner__subtitle">
              Your contributions fuel our grand Ganeshotsav celebrations and year-round community welfare initiatives.
            </p>
          </div>
        </section>

        {/* Portal section */}
        <section className="section section-donation-form">
          <div className="container donations-container">
            
            {/* Card 1: Make a Contribution */}
            <div className="form-card card donations-centered-card">
              <h2 className="section-title text-center donations-card-title">Make a Contribution</h2>
              <div className="flower-divider">
                <span className="line"></span>
                <span className="flower">✿</span>
                <span className="line"></span>
              </div>

              <form onSubmit={handleDonate} className="mt-6">
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-field-label">Full Name <span className="required-asterisk">*</span></label>
                  <div className="input-with-icon">
                    <i className="far fa-user input-icon"></i>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Enter your full name" 
                      value={donorInfo.name}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="form-group mt-4">
                  <label className="form-field-label">Mobile Number <span className="required-asterisk">*</span></label>
                  <div className="input-with-icon">
                    <i className="fas fa-phone-alt input-icon"></i>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Enter your mobile number" 
                      value={donorInfo.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="form-group mt-4">
                  <label className="form-field-label">Email Address <span className="optional-tag" style={{ color: '#888', fontSize: '12px', marginLeft: '5px' }}>(Optional)</span></label>
                  <div className="input-with-icon">
                    <i className="far fa-envelope input-icon"></i>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Enter your email address" 
                      value={donorInfo.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Custom Donation Amount */}
                <div className="form-group mt-4">
                  <label className="form-field-label">Donation Amount (₹) <span className="required-asterisk">*</span></label>
                  <div className="input-with-icon">
                    <span className="rupee-icon">₹</span>
                    <input 
                      type="number" 
                      placeholder="Enter custom amount" 
                      value={amount}
                      onChange={handleAmountChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg mt-6 donate-submit-btn" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Processing Securely...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-hand-holding-heart"></i> Donate Now
                    </>
                  )}
                </button>
              </form>

              <div className="security-notice">
                <i className="fas fa-lock"></i> Your contribution is secure and trusted
              </div>
            </div>

            {/* Card 2: Payment Information */}
            <div className="form-card card donations-centered-card mt-6">
              <h2 className="section-title text-center donations-card-title">Payment Information</h2>
              <div className="flower-divider">
                <span className="line"></span>
                <span className="flower">✿</span>
                <span className="line"></span>
              </div>
              <p className="text-center payment-subtitle">
                You can support us through direct transfer using the details below.
              </p>

              <div className="payment-methods mt-6">
                {/* UPI ID Row */}
                <div className="payment-method-row">
                  <div className="payment-badge-circle">
                    <span className="upi-text">UPI</span>
                  </div>
                  <div className="payment-method-details">
                    <span className="payment-label">UPI ID</span>
                    <span className="payment-value">{PAYMENT_INFO.upiId}</span>
                  </div>
                </div>

                {/* GPay Number Row */}
                <div className="payment-method-row mt-4">
                  <div className="payment-badge-circle">
                    <span className="gpay-text">
                      <span className="g-blue">G</span>
                      <span className="p-green"> Pay</span>
                    </span>
                  </div>
                  <div className="payment-method-details">
                    <span className="payment-label">GPay Number</span>
                    <span className="payment-value">{PAYMENT_INFO.gpayNumber}</span>
                  </div>
                </div>
              </div>

              <p className="payment-footer-note">
                After making the payment, kindly share the screenshot on our official WhatsApp number for confirmation and receipt.
              </p>
            </div>

          </div>
        </section>


      </main>
    </>
  );
};

export default Donations;
