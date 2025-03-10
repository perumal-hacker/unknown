const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const oauth2Client = new google.auth.OAuth2(
  '425496603912-0q9p0i0euguajg5u22p8iacdevpfvlj9.apps.googleusercontent.com', // Your client_id
  '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', // Your client secret
  'http://localhost:3000'
);

app.post('/exchange-code', async (req, res) => {
  const { code } = req.body;
  console.log('Received authorization code:', code);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens received:', tokens);
    oauth2Client.setCredentials(tokens);

    const accessToken = tokens.access_token;
    res.json({ accessToken });

    // Optionally store refresh token for future use
    if (tokens.refresh_token) {
      console.log('Refresh token received:', tokens.refresh_token);
    }
  } catch (error) {
    console.error('Error exchanging code:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/create-meeting', async (req, res) => {
  const { token } = req.body; // This should now be the access_token
  console.log('Received access token:', token);
  oauth2Client.setCredentials({ access_token: token });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    console.log('Attempting to create event with calendar API...');
    const event = {
      summary: 'My Google Meet Event',
      start: { dateTime: new Date().toISOString(), timeZone: 'America/Los_Angeles' },
      end: { dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), timeZone: 'America/Los_Angeles' },
      conferenceData: { createRequest: { requestId: `${Math.random().toString(36).substring(2)}`, conferenceSolutionKey: { type: 'hangoutsMeet' } } },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });

    console.log('Meeting created successfully:', response.data.hangoutLink);
    res.json({ meetLink: response.data.hangoutLink });
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: error.message });
  }
});
app.listen(8080, () => console.log('Server running on port 8080'));