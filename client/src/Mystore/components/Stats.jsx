// Stats.js
import React from 'react';
import './Stats.css';

const Stats = () => {
  return (
    <div className="stats">
      <div className="stat-box">
        <h3>Total Products</h3>
        <p>127</p>
      </div>
      <div className="stat-box">
        <h3>Total Revenue</h3>
        <p>$157</p>
      </div>
      <div className="stat-box">
        <h3>Successful</h3>
        <p>120</p>
      </div>
      <div className="stat-box">
        <h3>UnSuccessful</h3>
        <p>7</p>
      </div>
    </div>
  );
};

export default Stats;