const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const axios = require('axios').default;

const app = express();

// Function to base64 encode the environment variables
function encodeBase64() {
    const orgId = process.env.ORG_ID;
    const apiKey = process.env.API_KEY;

    if (!orgId || !apiKey) {
        console.error('Environment variables ORG_ID and API_KEY are required');
        return null;
    }

    const combined = `${orgId}:${apiKey}`;
    return 'Basic ' + Buffer.from(combined).toString('base64');
}

// Basic security protections
app.use(helmet());

// Enable CORS for all requests
app.use(cors());

// Logging HTTP requests
app.use(morgan('combined'));

// Parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Dyte Create a Meeting route
// https://github.com/Reed-Broadhead/VC-Connect/issues/2
// https://docs.dyte.io/api/?v=v2#/operations/create_meeting

// Creator of the meeting
// Front-End to our Back-End
app.post('/meetings', async (req, res) => {
    // Back-End to Dyte
    const encodedString = encodeBase64();
    const optionsMeeting = {
      method: 'POST',
      url: 'https://api.dyte.io/v2/meetings',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: encodedString
      },
      data: {
        title: 'string',
        preferred_region: 'us-west-1',
        // record_on_start: false,
        // live_stream_on_start: false,
        // recording_config: {
        //   max_seconds: 60,
        //   file_name_prefix: 'string',
        //   video_config: {
        //     codec: 'H264',
        //     width: 1280,
        //     height: 720,
        //     watermark: {url: 'http://example.com', size: {width: 1, height: 1}, position: 'left top'}
        //   },
        //   audio_config: {codec: 'AAC', channel: 'stereo'},
        //   storage_config: {
        //     type: 'aws',
        //     access_key: 'string',
        //     secret: 'string',
        //     bucket: 'string',
        //     region: 'us-east-1',
        //     path: 'string',
        //     auth_method: 'KEY',
        //     username: 'string',
        //     password: 'string',
        //     host: 'string',
        //     port: 0,
        //     private_key: 'string'
        //   },
        //   dyte_bucket_config: {enabled: true},
        //   live_streaming_config: {rtmp_url: 'rtmp://a.rtmp.youtube.com/live2'}
        // }
      }
    };
    
    try {
        // Try to create a meeting
        const { dataMeeting } = await axios.request(optionsMeeting);
        joinMeeting(dataMeeting)
      } catch (error) {
        console.error(error);
      }
    })
    
    async function joinMeeting(meetingId, encodedString = encodeBase64()) {
      try {
        const optionsParticipant = {
        method: 'POST',
        url: `https://api.dyte.io/v2/meetings/${meetingId}/participants`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: encodedString
        },
        data: {
            name: 'Mary Sue',
            picture: 'https://i.imgur.com/test.jpg',
            preset_name: 'string',
            custom_participant_id: 'string'
        }
        };
        const {dataParticipant} = await axios.request(optionsParticipant);
        
      
        res.status(200).send(dataParticipant);
    
      } catch (error) {
        console.error(error.message, '[OH, NO!]')
      }
    }
    
// Joining a meeting someone else created


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
