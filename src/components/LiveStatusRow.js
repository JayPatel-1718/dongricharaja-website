import React from 'react';
import './LiveStatusRow.css';

const LiveStatusRow = () => {
  return (
    <div className="live-status-row">
      <div><i className="fas fa-video status-icon"></i></div>
      <div>
        <strong className="live-title">📢 LIVE DARSHAN:</strong> 
        <span className="secondary-info"> Current waiting time reduced to 45 min | Annadanam langar seva active</span>
      </div>
      <button className="btn-primary watch-btn">
        Watch Aarti Live <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default LiveStatusRow;