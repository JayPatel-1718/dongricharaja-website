import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useData } from '../../context/DataContext';
import './Donations.css';

const Donations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { addDonation } = useData();

  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
    address: ""
  });
  const [amount, setAmount] = useState(1001);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedFund, setSelectedFund] = useState("General Trust Fund");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txDetails, setTxDetails] = useState(null);

  const quickAmounts = [501, 1001, 5001, 10001];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickAmount = (val) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setAmount(val ? parseInt(val, 10) : 0);
  };

  const handleDonate = (e) => {
    e.preventDefault();

    // Validation
    if (!donorInfo.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!donorInfo.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!donorInfo.pan.trim()) {
      toast.error("PAN Card is required for 80G tax receipt.");
      return;
    }
    if (amount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    // Process Donation
    setIsProcessing(true);
    toast.loading("Redirecting to secure gateway...", { id: "payment" });

    setTimeout(() => {
      // Simulate successful payment
      setIsProcessing(false);
      const generatedTx = {
        txId: "DCR-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        receiptNo: "REC-" + Math.floor(50000 + Math.random() * 50000),
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        donorPhone: donorInfo.phone,
        donorPan: donorInfo.pan.toUpperCase(),
        donorAddress: donorInfo.address || "N/A",
        amountPaid: amount,
        fundName: selectedFund
      };
      
      setTxDetails(generatedTx);
      setShowReceipt(true);
      // Track this donation in admin panel
      addDonation(generatedTx);
      toast.success("Payment Successful! Your 80G receipt has been generated.", { id: "payment" });
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setDonorInfo({ name: "", email: "", phone: "", pan: "", address: "" });
    setAmount(1001);
    setCustomAmount("");
    setSelectedFund("General Trust Fund");
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
        {/* Premium Gold Coin Hero */}
        <section className="page-hero donations-page-hero">
          <div className="donations-hero-glow" />
          <div className="donations-hero-coins">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="coin-float">
                <i className="fas fa-coins" />
              </div>
            ))}
          </div>
          <div className="page-hero-content">
            <div className="page-hero-eyebrow">
              <i className="fas fa-hand-holding-heart" /> Support the Trust
            </div>
            <h1>Online Donations</h1>
            <p>Your contributions fuel our grand Ganeshotsav celebrations and year-round community welfare initiatives.</p>
            <div className="page-hero-breadcrumb">
              <a href="/">Home</a>
              <i className="fas fa-chevron-right" />
              <span>Donations</span>
            </div>
          </div>
          <div className="page-hero-wave">
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,30 Q360,60 720,20 Q1080,-10 1440,40 L1440,60 L0,60 Z" fill="var(--royal-dark, #0D0520)" />
            </svg>
          </div>
        </section>

        {/* Portal section */}
        <section className="section section-donation-form">
          <div className="container">
            <div className="donation-form-wrapper grid grid-cols-2">
              {/* Form Side */}
              <div className="form-card card">
                <h2 className="section-title">Support Our Seva</h2>
                <p>Fill out the form to proceed. All donations are 100% secure.</p>

                <form onSubmit={handleDonate} className="mt-6">
                  {/* Select Fund */}
                  <div className="form-group">
                    <label>Choose Seva Fund</label>
                    <select 
                      value={selectedFund} 
                      onChange={(e) => setSelectedFund(e.target.value)}
                      className="form-control"
                    >
                      <option value="General Trust Fund">General Trust Fund (Pandal & festival cost)</option>
                      <option value="Annadanam Seva">Annadanam Seva (Free festival food drives)</option>
                      <option value="Medical Assistance Fund">Medical Assistance Fund (Free clinics & equipment)</option>
                      <option value="Education Support Fund">Education Support Fund (Scholarships & school kits)</option>
                    </select>
                  </div>

                  {/* Amounts selection */}
                  <div className="form-group mt-4">
                    <label>Select Amount (₹)</label>
                    <div className="amounts-grid-selector">
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={amount === amt && !customAmount ? "amt-btn active" : "amt-btn"}
                          onClick={() => handleQuickAmount(amt)}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                    
                    <div className="custom-amount-input mt-3">
                      <span className="rupee-icon">₹</span>
                      <input 
                        type="number" 
                        placeholder="Enter custom amount..." 
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                      />
                    </div>
                  </div>

                  {/* Donor personal details */}
                  <h3 className="form-subtitle mt-6">Donor Information</h3>

                  <div className="form-group mt-3">
                    <label>Full Name *</label>
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

                  <div className="grid grid-cols-2 mt-3" style={{ gap: '16px' }}>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="yourname@gmail.com" 
                        value={donorInfo.email}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="10-digit number" 
                        value={donorInfo.phone}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <label>PAN Card Number (Required for 80G tax exemption) *</label>
                    <input 
                      type="text" 
                      name="pan"
                      placeholder="ABCDE1234F" 
                      value={donorInfo.pan}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>Postal Address</label>
                    <textarea 
                      name="address"
                      placeholder="Enter billing address for tax invoice" 
                      value={donorInfo.address}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="3"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg mt-6" 
                    style={{ width: '100%' }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span><i className="fas fa-spinner fa-spin"></i> Processing Securely...</span>
                    ) : (
                      <span><i className="fas fa-heart"></i> Proceed to Donate ₹{amount}</span>
                    )}
                  </button>
                </form>
              </div>

              {/* Perks Side */}
              <div className="info-card-side">
                <div className="info-panel dark-glass-card">
                  <h2>Donation Perks & Exemptions</h2>
                  <p className="mt-3">Your faith and generosity help us bring harmony and relief to thousands. Here is what we guarantee:</p>
                  
                  <ul className="perks-list mt-6">
                    <li>
                      <i className="fas fa-shield-halved perk-icon"></i>
                      <div>
                        <strong>80G Tax Deduction</strong>
                        <span>Dongri Cha Raja trust is registered under Section 80G of the Income Tax Act. Save up to 50% on taxable income for this contribution.</span>
                      </div>
                    </li>
                    <li>
                      <i className="fas fa-receipt perk-icon"></i>
                      <div>
                        <strong>Instant Receipt</strong>
                        <span>Upon transaction clearance, download your official authenticated tax receipt instantly directly from the browser window.</span>
                      </div>
                    </li>
                    <li>
                      <i className="fas fa-square-check perk-icon"></i>
                      <div>
                        <strong>Complete Transparency</strong>
                        <span>All funds are strictly audited by certified chartered accountants and published annually in our reports dashboard.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
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
                      <td className="lbl">Donor PAN Number:</td>
                      <td className="val font-semibold">{txDetails.donorPan}</td>
                    </tr>
                    <tr>
                      <td className="lbl">Phone / Email:</td>
                      <td className="val">{txDetails.donorPhone || "N/A"} / {txDetails.donorEmail}</td>
                    </tr>
                    <tr>
                      <td className="lbl">Postal Address:</td>
                      <td className="val">{txDetails.donorAddress}</td>
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
