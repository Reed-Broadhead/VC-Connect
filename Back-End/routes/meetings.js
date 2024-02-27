const express = require('express');
const router = express.Router();
const axios = require('axios').default;
require('dotenv').config();

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

async function joinMeeting(meetingId, encodedString = encodeBase64()) {
  console.log(meetingId);
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
          preset_name: 'group_call_participant',
          custom_participant_id: '497f6eca-6276-4993-bfeb-53cbbbba6f08'
      }
    };
    const {data} = await axios.request(optionsParticipant);
    return(data)
  } catch (error) {
    console.error(error.message, '[OH, NO!]')
  }
}

// Dyte Create a Meeting route
// https://github.com/Reed-Broadhead/VC-Connect/issues/2
// https://docs.dyte.io/api/?v=v2#/operations/create_meeting

// Creator of the meeting
// Front-End to our Back-End
router.post('/meetings', async (req, res) => {
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
      preferred_region: 'ap-south-1',
      record_on_start: false,
      live_stream_on_start: false,
      recording_config: {
        max_seconds: 60,
        file_name_prefix: 'string',
        video_config: {
          codec: 'H264',
          width: 1280,
          height: 720,
          watermark: {url: 'http://example.com', size: {width: 1, height: 1}, position: 'left top'}
        },
        audio_config: {codec: 'AAC', channel: 'stereo'},
        storage_config: {
          type: 'aws',
          access_key: 'string',
          secret: 'string',
          bucket: 'string',
          region: 'us-east-1',
          path: 'string',
          auth_method: 'KEY',
          username: 'string',
          password: 'string',
          host: 'string',
          port: 0,
          private_key: 'string'
        },
        dyte_bucket_config: {enabled: true},
        live_streaming_config: {rtmp_url: 'rtmp://a.rtmp.youtube.com/live2'}
      }
    }
  };
    
  try {
      // Try to create a meeting
      const dataMeeting = await axios.request(optionsMeeting);
      const data = await joinMeeting(dataMeeting.data.data.id)

      res.status(200).send(data.data.token);
    } catch (error) {
      console.error(error);
    }
}) 

module.exports = router;