import React from 'react';

const VIPPassCard = () => {
  return (
    <div className="card">
      <div className="card-icon"><i className="fas fa-ticket-alt"></i></div>
      <h3>VIP Darshan Pass</h3>
      <p className="body-text">
        Contribute to the Mandal and get priority access for the entire festival family. 
        Skip the queue & premium seating.
      </p>
      <div className="price">
        ₹2,500 <span style={{fontSize: '0.9rem', fontWeight: 400}}>/ Family</span>
      </div>
      <button className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>
        <i className="fas fa-hand-holding-heart"></i> Get Pass Now
      </button>
    </div>
  );
};

export default VIPPassCard;