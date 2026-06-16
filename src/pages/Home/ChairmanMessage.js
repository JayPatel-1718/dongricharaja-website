import React, { useState } from 'react';
import './ChairmanMessage.css';

const ChairmanMessage = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="chairman-section" id="chairman-message">
      <div className="chairman-bg-decoration">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
      </div>
      <div className="container">
        <div className="chairman-grid">
          {/* Portrait Side */}
          <div className="chairman-portrait-side">
            <div className="portrait-frame-outer">
              <div className="portrait-frame-inner">
                <img
                  src="/images/chairman_portrait.jpg"
                  alt="Shri. Madhusudan Sharda Mahadev Amre, President"
                  className="chairman-photo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="chairman-photo-fallback" style={{ display: 'none' }}>
                  <i className="fas fa-user-circle"></i>
                </div>
              </div>
              <div className="portrait-gold-ring" />
            </div>
            <div className="chairman-identity">
              <div className="chairman-om">ॐ</div>
              <h3 className="chairman-name">Shri. Madhusudan Sharda Mahadev Amre</h3>
              <p className="chairman-title">President, Dongri Cha Raja</p>
              <p className="chairman-subtitle">Sarvajani Ganesh Utsav Mandal</p>
              <div className="chairman-tenure">
                <i className="fas fa-award"></i>
                <span>Serving Since 2010</span>
              </div>
            </div>
          </div>

          {/* Message Side */}
          <div className="chairman-message-side">
            <div className="message-accent-bar" />
            <div className="message-label">
              <i className="fas fa-scroll"></i>
              <span>President's Message</span>
            </div>
            <h2 className="message-heading">A Message of Devotion & Unity</h2>

            <div className="message-marathi">
              <span className="quote-mark open">"</span>
              <p>
                आपल्या सर्वांच्या सहकार्याने आणि आशीर्वादाने डोंगरी सार्वजनिक गणेशोत्सव मंडळ गेली ५० वर्षे गणेशोत्सवाची सेवा करत आहे. आपल्या सर्वांच्या प्रेमामुळे आम्ही दरवर्षी उत्साहाने हा सण साजरा करतो.
              </p>
              <span className="quote-mark close">"</span>
            </div>

            <p className="message-english">
              This year, we have planned even more enriching spiritual and cultural programs for devotees across all walks of life. We warmly invite you all to come and seek the blessings of Bappa.
            </p>

            {expanded && (
              <p className="message-english message-extra">
                Our mandal continues to uphold the values of social harmony, environmental consciousness, and community service. Together, let us celebrate this festival with unity, deep devotion, and a spirit of social responsibility. May Bappa's blessings be upon you all.
              </p>
            )}

            <div className="message-actions">
              <div className="blessing-text">
                <i className="fas fa-dharmachakra spin-decoration"></i>
                <span>गणपती बाप्पा मोरया!</span>
              </div>
              <button
                className="btn-expand"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {expanded ? (
                  <><i className="fas fa-chevron-up"></i> Show Less</>
                ) : (
                  <><i className="fas fa-chevron-down"></i> Read Full Message</>
                )}
              </button>
            </div>

            <div className="chairman-signature">
              <div className="sig-line" />
              <p className="sig-name">Shri. Madhusudan Sharda Mahadev Amre</p>
              <p className="sig-role">President</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanMessage;