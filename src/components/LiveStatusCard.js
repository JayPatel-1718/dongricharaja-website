import React from 'react';

const LiveStatusCard = () => {
  return (
    <div className="card">
      <div className="card-icon"><i className="fas fa-chart-simple"></i></div>
      <h3>LIVE STATUS</h3>
      <div style={{margin: '16px 0'}}>
        <span className="secondary-info">Darshan Waiting Time</span>
        <div className="waiting-time" style={{fontSize: '2rem', marginTop: 6}}>45 mins</div>
        <p className="secondary-info" style={{marginTop: 8}}>
          Real-time update from the pandal entrance.
        </p>
      </div>
      <button className="btn-outline">
        <i className="fas fa-map-marked-alt"></i> View Crowd Map
      </button>
    </div>
  );
};

export default LiveStatusCard;