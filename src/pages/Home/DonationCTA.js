import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DonationCTA.css';

const DonationCTA = () => {
  const [selectedAmount, setSelectedAmount] = useState(1001);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const amounts = [501, 1001, 2101, 5001, 11000];

  const handleAmountSelect = (amt) => {
    setSelectedAmount(amt);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustom = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const getDisplayAmount = () => {
    if (isCustom && customAmount) return parseInt(customAmount);
    return selectedAmount;
  };

  return (
    <section className="donation-cta-section" id="donate">
      <div className="donation-bg-glow" />
      <div className="container">
        <div className="donation-grid">
          {/* Left: Info */}
          <div className="donation-info">
            <div className="donation-eyebrow">
              <i className="fas fa-hand-holding-heart"></i>
              <span>Support Our Mission</span>
            </div>
            <h2 className="donation-heading">
              Your Donation Fuels<br />
              <span className="text-gold">Divine Celebrations</span>
            </h2>
            <p className="donation-desc">
              Every rupee you contribute helps us organize grand celebrations, community services,
              and cultural programs that touch thousands of lives each year.
            </p>

            <div className="donation-trust-badges">
              <div className="trust-badge">
                <div className="trust-icon">
                  <i className="fas fa-file-invoice"></i>
                </div>
                <div>
                  <strong>80G Tax Exemption</strong>
                  <span>Certificate provided instantly</span>
                </div>
              </div>
              <div className="trust-badge">
                <div className="trust-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div>
                  <strong>100% Secure</strong>
                  <span>SSL encrypted payments</span>
                </div>
              </div>
              <div className="trust-badge">
                <div className="trust-icon">
                  <i className="fas fa-qrcode"></i>
                </div>
                <div>
                  <strong>Multiple Options</strong>
                  <span>UPI, Cards, Net Banking</span>
                </div>
              </div>
            </div>

            <div className="donation-impact">
              <div className="impact-stat">
                <span className="impact-num">₹2.4Cr+</span>
                <span className="impact-label">Raised in 2025</span>
              </div>
              <div className="impact-stat">
                <span className="impact-num">12,000+</span>
                <span className="impact-label">Donors</span>
              </div>
              <div className="impact-stat">
                <span className="impact-num">100%</span>
                <span className="impact-label">Transparent</span>
              </div>
            </div>
          </div>

          {/* Right: Amount Selector */}
          <div className="donation-card">
            <div className="donation-card-header">
              <i className="fas fa-om"></i>
              <div>
                <h3>Make a Donation</h3>
                <p>Choose your contribution amount</p>
              </div>
            </div>

            <div className="amount-grid">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  className={`amount-btn ${selectedAmount === amt && !isCustom ? 'active' : ''}`}
                  onClick={() => handleAmountSelect(amt)}
                  aria-label={`Donate ₹${amt.toLocaleString('en-IN')}`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
              <button
                className={`amount-btn amount-btn-custom ${isCustom ? 'active' : ''}`}
                onClick={handleCustom}
              >
                Custom ✏️
              </button>
            </div>

            {isCustom && (
              <div className="custom-input-wrapper">
                <span className="custom-rupee">₹</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="custom-input"
                  id="custom-donation-amount"
                  aria-label="Custom donation amount"
                  autoFocus
                />
              </div>
            )}

            <div className="donation-summary">
              <div className="summary-row">
                <span>Donation Amount</span>
                <span>₹{getDisplayAmount() ? getDisplayAmount().toLocaleString('en-IN') : '---'}</span>
              </div>
              <div className="summary-row">
                <span>Processing Fee</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="summary-row summary-total">
                <strong>Total</strong>
                <strong>₹{getDisplayAmount() ? getDisplayAmount().toLocaleString('en-IN') : '---'}</strong>
              </div>
            </div>

            <Link to="/donations" className="btn-donate-now">
              <i className="fas fa-hand-holding-heart"></i>
              Donate Now · Ganpati Bappa Morya!
            </Link>
            <p className="donation-note">
              <i className="fas fa-lock"></i>
              Secure payment · 80G receipt via email
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCTA;