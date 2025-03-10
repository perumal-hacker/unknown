import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

// Configure Zoom SDK
ZoomMtg.setZoomJSLib("https://source.zoom.us/2.12.0/lib", "/av"); // Change version as needed
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const ZoomMeeting = ({ meetingNumber, userName, userEmail, passcode, signature, apiKey }) => {
  
  useEffect(() => {
    ZoomMtg.init({
      leaveUrl: "https://your-redirect-url.com",
      isSupportAV: true,
      success: () => {
        ZoomMtg.join({
          meetingNumber: meetingNumber,
          userName: userName,
          userEmail: userEmail,
          passWord: passcode,
          signature: signature,  // Generated from backend
          apiKey: apiKey,
          success: () => {
            console.log("Zoom Meeting Joined!");
          },
          error: (err) => {
            console.error("Join Error:", err);
          }
        });
      },
      error: (err) => {
        console.error("Init Error:", err);
      }
    });
  }, [meetingNumber, userName, userEmail, passcode, signature, apiKey]);

  return (
    <div>
      <h3>Zoom Meeting</h3>
      <div id="zmmtg-root"></div>
    </div>
  );
};

export default ZoomMeeting;
