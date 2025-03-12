const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // Specify frontend origin
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/helpdesk', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Google OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  '425496603912-0q9p0i0euguajg5u22p8iacdevpfvlj9.apps.googleusercontent.com',
  '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',
  'http://localhost:3000'
);

// Google OAuth Routes
app.post('/exchange-code', async (req, res) => {
  const { code } = req.body;
  console.log('Received authorization code:', code);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens received:', tokens);
    oauth2Client.setCredentials(tokens);

    const accessToken = tokens.access_token;
    res.json({ accessToken });

    if (tokens.refresh_token) {
      console.log('Refresh token received:', tokens.refresh_token);
    }
  } catch (error) {
    console.error('Error exchanging code:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/create-meeting', async (req, res) => {
  const { token } = req.body;
  console.log('Received access token:', token);
  oauth2Client.setCredentials({ access_token: token });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    console.log('Attempting to create event with calendar API...');
    const event = {
      summary: 'My Google Meet Event',
      start: { dateTime: new Date().toISOString(), timeZone: 'America/Los_Angeles' },
      end: { dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), timeZone: 'America/Los_Angeles' },
      conferenceData: { 
        createRequest: { 
          requestId: `${Math.random().toString(36).substring(2)}`, 
          conferenceSolutionKey: { type: 'hangoutsMeet' } 
        } 
      },
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

// Call Request Schema and Model
// ... other imports and existing code ...

// Call Request Schema and Model
const callRequestSchema = new mongoose.Schema({
  userId: String,
  requestDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  },
  requestMethod: { // New field to track how the request was received
    type: String,
    enum: ['call', 'message'],
    required: true
  },
  notes: String
});

const CallRequest = mongoose.model('CallRequest', callRequestSchema);

// Call Request Routes
app.post('/api/call-request', async (req, res) => {
  try {
    const callRequest = new CallRequest({
      userId: req.body.userId,
      requestMethod: req.body.requestMethod // Expect this from the frontend
    });
    await callRequest.save();
    res.status(201).json({ message: 'Call request submitted' });
  } catch (error) {
    console.error('Error submitting call request:', error);
    res.status(500).json({ error: 'Error submitting call request' });
  }
});


app.get('/api/call-requests', async (req, res) => {
  try {
    const requests = await CallRequest.find().sort({ requestDate: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Error fetching requests' });
  }
});

app.put('/api/call-request/:id', async (req, res) => {
  try {
    const request = await CallRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ error: 'Error updating request' });
  }
});

app.put('/api/call-request/:id', async (req, res) => {
  try {
    const request = await CallRequest.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        notes: req.body.notes
      },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ error: 'Error updating request' });
  }
});

app.listen(8080, () => console.log('Server running on port 8080'));