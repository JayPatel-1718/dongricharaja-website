import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useData } from '../../context/DataContext';
import './Donations.css';

// Payment Information - Mandal committee can easily update these details
const PAYMENT_INFO = {
  upiId: "dongricharaja@upi",
  gpayNumber: "9876543210"
};

const Donations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { addDonation } = useData();

  const [donorInfo, setDonorInfo] = useState({
    name: "",
    phone: ""
  });
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txDetails, setTxDetails] = useState(null);

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

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    // Load configurations from environment variables
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    const razorpayKeyId = process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_placeholder';

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
        throw new Error("Failed to create order from backend server.");
      }

      const orderData = await response.json();

      // 2. Open Razorpay checkout options
      const options = {
        key: razorpayKeyId,
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
            // 3. Cryptographically verify signature on the backend
            const verificationResponse = await fetch(`${backendUrl}/api/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature
              })
            });

            if (!verificationResponse.ok) {
              throw new Error("Payment signature verification failed.");
            }

            // 4. Generate transaction receipt upon success
            const generatedTx = {
              txId: razorpayResponse.razorpay_payment_id,
              date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
              receiptNo: "REC-" + Math.floor(50000 + Math.random() * 50000),
              donorName: donorInfo.name,
              donorPhone: phoneTrimmed,
              amountPaid: numericAmount,
              fundName: "General Donation"
            };

            setTxDetails(generatedTx);
            setShowReceipt(true);
            
            // Track in firebase context
            addDonation(generatedTx);
            toast.success("Payment Successful! Thank you for your support.", { id: toastId });
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

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setDonorInfo({ name: "", phone: "" });
    setAmount("");
    setShowReceipt(false);
    setTxDetails(null);
  };

  return (
    <>
      <Helmet>
        <title>Online Donations | Dongri Cha Raja</title>
        <meta name="description" content="Support the community drives of Dongri Cha Raja. Secure online donations with instant 80G tax exemption receipts." />
      </Helmet>

      <main className="donations-page fade-in">
        {/* Banner */}
        <section className="donations-banner">
          <div className="banner-overlay"></div>
          <div className="container">
            <h1>Online Donations</h1>
            <p>Your contributions fuel our spiritual and social impact initiatives</p>
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

        {/* Receipt Modal */}
        {showReceipt && txDetails && (
          <div className="receipt-overlay">
            <div className="receipt-modal card">
              <div className="receipt-actions">
                <button className="btn btn-outline btn-sm" onClick={handlePrint}>
                  <i className="fas fa-print"></i> Print / Save PDF
                </button>
                <button className="btn btn-primary btn-sm" onClick={resetForm}>
                  Close & New Donation
                </button>
              </div>

              {/* Printable Area */}
              <div className="printable-receipt" id="receipt-print-area">
                <div className="receipt-header">
                  <i className="fas fa-om receipt-logo"></i>
                  <div>
                    <h2>DONGRI CHA RAJA SARVAJANI GANESH UTSAV MANDAL</h2>
                    <p className="subtitle">Registered Charitable Trust No. E-12435 (MUMBAI) · 80G Approved</p>
                    <p className="address-line">Dongri Main Street, Mumbai - 400009, Maharashtra, India</p>
                  </div>
                </div>

                <hr className="divider" />

                <div className="receipt-title-box">
                  <h3>DONATION RECEIPT (UNDER SECTION 80G OF INCOME TAX ACT)</h3>
                </div>

                <div className="receipt-info-grid">
                  <div>
                    <strong>Receipt No:</strong> {txDetails.receiptNo}
                  </div>
                  <div>
                    <strong>Date:</strong> {txDetails.date}
                  </div>
                  <div>
                    <strong>Transaction ID:</strong> {txDetails.txId}
                  </div>
                  <div>
                    <strong>Status:</strong> <span className="success-tag">PAID</span>
                  </div>
                </div>

                <table className="receipt-details-table">
                  <tbody>
                    <tr>
                      <td className="lbl">Received with thanks from:</td>
                      <td className="val font-semibold">{txDetails.donorName}</td>
                    </tr>
                    <tr>
                      <td className="lbl">Mobile Number:</td>
                      <td className="val">{txDetails.donorPhone}</td>
                    </tr>
                    <tr>
                      <td className="lbl">Purpose / Fund:</td>
                      <td className="val">{txDetails.fundName}</td>
                    </tr>
                    <tr className="amount-row">
                      <td className="lbl font-bold text-lg">Total Amount Contributed:</td>
                      <td className="val font-bold text-lg text-primary">₹{txDetails.amountPaid.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="receipt-footer-notes">
                  <p>Certified that the donation received will be utilized strictly for charitable objectives and religious events program.</p>
                  <p><em>* This is a computer-generated tax certificate and does not require a physical signature. The trust claims exemption under Section 80G of the IT Act.</em></p>
                </div>

                <div className="receipt-signatures">
                  <div className="sig-block">
                    <span className="signature-line">Madhusudan Sharda Mahadev Amre</span>
                    <span className="role">Trust President</span>
                  </div>
                  <div className="sig-block text-right">
                    <div className="mock-seal">TRUST SEAL APPROVED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Donations;
