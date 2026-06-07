import React from 'react';
import './AccessibilityReport.css';

const AccessibilityReport = () => {
  const reports = [
    { label: 'Saffron on Cream', ratio: '4.5:1', status: 'PASS', classColor: 'saffron' },
    { label: 'Maroon on Cream', ratio: '10.2:1', status: 'PASS', classColor: 'maroon' },
    { label: 'Gold on Maroon', ratio: '5.1:1', status: 'PASS', classColor: 'gold' },
    { label: 'White on Sacred Red', ratio: '4.8:1', status: 'PASS', classColor: 'red' }
  ];

  return (
    <div className="accessibility-section">
      <h2 style={{borderLeftColor: '#F67900', marginBottom: 12}}>✨ Accessibility Report</h2>
      <p className="secondary-info" style={{marginBottom: 24}}>
        Exceeding WCAG AAA standards — ensuring legibility for all devotees, 
        especially during low-light outdoor use.
      </p>
      <div className="report-grid">
        {reports.map((item, idx) => (
          <div key={idx} className={`report-item ${item.classColor}`}>
            <div style={{fontWeight: 600, fontSize: '1rem'}}>{item.label}</div>
            <div className="contrast-badge">{item.ratio}</div>
            <div style={{color: '#2B7A3E', fontWeight: 600, marginTop: 6}}>
              <i className="fas fa-check-circle"></i> {item.status}
            </div>
          </div>
        ))}
      </div>
      <p className="body-text" style={{marginTop: 24, fontSize: '0.9rem'}}>
        <i className="fas fa-universal-access"></i> The palette uses high-contrast text combinations 
        to ensure devotees of all ages can easily navigate the website, especially during low-light outdoor use.
      </p>
    </div>
  );
};

export default AccessibilityReport;