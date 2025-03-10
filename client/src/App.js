import React from 'react'
import Header from './Header/components/Header'
import AdminMeeting from './Admin/components/AdminMeeting'
import MeetingPage from './zoom/components/MeetingPage'
import StoreProductContainer from './Mystore/components/StoreProductContainer'
import Meet from './Meeting API/components/Meet'


export default function App() {
  return (
    <>
    {/* <Header/> */}
    {/* <AdminMeeting/> */}
    {/* <MeetingPage/> */}
    {/* <StoreProductContainer/> */}
    <Meet/>
    </>
  )
}


// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
// import { useState } from 'react';
// import createMeeting from './Meeting API/components/googleCalendar';
// import './App.css';

// function LoginButton() {
//   const [meetLink, setMeetLink] = useState(null);

//   const login = useGoogleLogin({
//     scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
//     flow: 'auth-code',
//     prompt: 'consent',
//     onSuccess: async (codeResponse) => {
//       console.log('Authorization Code Response:', codeResponse);
//       const code = codeResponse.code;

//       try {
//         const response = await fetch('http://localhost:8080/exchange-code', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ code }),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to exchange code: ' + response.statusText);
//         }

//         const { accessToken } = await response.json();
//         console.log('Received Access Token:', accessToken);
//         localStorage.setItem('google_token', accessToken);

//         const meetLink = await createMeeting(accessToken);
//         console.log('Meeting Link Created:', meetLink);
//         setMeetLink(meetLink);
//       } catch (error) {
//         console.error('Error exchanging code or creating meeting:', error);
//       }
//     },
//     onError: (error) => console.error('Login Failed:', error),
//   });

//   return (
//     <div>
//       <button onClick={() => login()}>Sign in with Google</button>
//       {meetLink && (
//         <div>
//           <h2>Your Meeting is Ready!</h2>
//           <a href={meetLink} target="_blank" rel="noopener noreferrer">
//             Join Google Meet
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// function App() {
//   console.log('Client ID from env:', process.env.REACT_APP_GOOGLE_CLIENT_ID); // Debug log
//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <div className="App">
//         <h1>Google Meet Integration</h1>
//         <p>Sign in to create a meeting</p>
//         <LoginButton />
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;

