import React, { useState } from "react";
import "./HelpDesk.css";
import axios from 'axios';

const HelpDesk = () => {
  const [callRequestStatus, setCallRequestStatus] = useState('');
  const [isError, setIsError] = useState(false);

  const handleCallRequest = async (method) => {
    try {
      const response = await axios.post('http://localhost:8080/api/call-request', {
        userId: 'user123', // Replace with actual user authentication in production
        requestMethod: method // 'call' or 'message'
      });
      
      if (response.status === 201) {
        setIsError(false);
        setCallRequestStatus(`${method === 'call' ? 'Call' : 'Message'} request submitted successfully!`);
        setTimeout(() => setCallRequestStatus(''), 3000);
      }
    } catch (error) {
      setIsError(true);
      setCallRequestStatus('Error submitting request');
      console.error('Error:', error.response?.data || error.message);
      setTimeout(() => setCallRequestStatus(''), 3000);
    }
  };

  return (
    <div className="help-desk">
      <h2 className="section-title">Tutorial</h2>
      <div className="tutorial-grid">
        {[
          "How Dashboard works?",
          "My Store Details",
          "How Request works?",
          "How Order works?",
          "How Meeting works?",
          "What is Help desk for?",
          "How to optimize your profile?",
        ].map((title, index) => (
          <div key={index} className="tutorial-card">
            <p>{title}</p>
            <div className="tutorial-thumbnail"></div>
          </div>
        ))}
      </div>

      <div className="bug-contact-section">
        <div className="bug-report">
          <h3>Bug Report</h3>
          <label>Bug Page</label>
          <select>
            <option>Dashboard</option>
            <option>My Store</option>
            <option>Request</option>
            <option>Order</option>
            <option>Meeting</option>
            <option>Help Desk</option>
          </select>

          <label>Priority</label>
          <select>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>Label Name</label>
          <textarea placeholder="Label" className="Label"></textarea>

          <div className="bug-actions">
            <button className="upload-btn">Upload Image</button>
            <button className="report-btn">Report</button>
          </div>
        </div>
        
        <div className="divider"></div>
        
        <div className="contact-us">
          <h3>Contact us</h3>
          <div className="contact-buttons">
            <button className="contact-btn" onClick={() => handleCallRequest('call')}>
              ☎ Ask for Call?
            </button>
            <button className="contact-btn" onClick={() => handleCallRequest('message')}>
              ✉ Message Us
            </button>
            {/* Note: "Mail Us" is not tied to call request here; adjust if needed */}
            <button className="contact-btn">💬 Mail Us</button>
          </div>
          {callRequestStatus && (
            <p className={`request-status ${isError ? 'error' : ''}`}>
              {callRequestStatus}
            </p>
          )}
          <textarea placeholder="Feedback" className="feedback"></textarea>
          <button className="send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;