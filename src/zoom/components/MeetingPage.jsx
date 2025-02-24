import React from "react";
import "./MeetingPage.css"; // Import the CSS file

const pastMeetings = [
  {
    title: "Project Discussion",
    date: "Feb 10, 2025",
    time: "2:00 PM",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Tech Talk on React",
    date: "Feb 12, 2025",
    time: "5:00 PM",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
  },
];

const availableMeetings = [
  { title: "Morning Standup", description: "Daily team sync-up", time: "10:00 AM", seats: 5 },
  { title: "Client Presentation", description: "Project review with client", time: "4:00 PM", seats: 8 },
  { title: "Tech Webinar", description: "Latest trends in AI", time: "7:00 PM", seats: 10 },
];

const MeetingPage = () => {
  return (
    <div className="meeting-container">
      {/* Previous Meet Button */}
      <div className="previous-meet-container">
        <button className="previous-meet-btn">Previous Meet</button>
      </div>

      {/* Form Section and Video Section */}
      <div className="form-content-section">
        {/* Form Container */}
        <div className="form-container">
          <label>Name</label>
          <input type="text" placeholder="Enter Your Name" />

          <label>Time Selection</label>
          <div className="time-selection">
            <input
              type="time"
              className="time-picker"
              onClick={(e) => e.target.showPicker()} // Opens the picker when clicking anywhere in the field
            />
          </div>

          <button className="register-btn">Register</button>
        </div>

        {/* Video Section */}
        <div className="video-section">
          <div className="video-content">
            {pastMeetings.map((meeting, index) => (
              <div key={index} className="video-card">
                <video controls>
                  <source src={meeting.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-info">
                  <h3>{meeting.title}</h3>
                  <p><strong>Date:</strong> {meeting.date}</p>
                  <p><strong>Time:</strong> {meeting.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meeting Cards Section */}
      <div className="meeting-cards">
        {availableMeetings.map((meeting, index) => (
          <div key={index} className="meeting-card">
            <h3>{meeting.title}</h3>
            <p>{meeting.description}</p>
            <p><strong>Time:</strong> {meeting.time}</p>
            <p><strong>Seats Available:</strong> {meeting.seats}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingPage;
