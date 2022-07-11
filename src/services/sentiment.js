// load env
import { constants } from '../config/index.js';

// load AWS sdk
import {
  ComprehendClient,
  DetectSentimentCommand,
} from '@aws-sdk/client-comprehend';

// Instance Comprehend client
const client = new ComprehendClient({
  region: constants.REGION,
  credentials: {
    accessKeyId: constants.ACCESS_KEY_ID,
    secretAccessKey: constants.SECRET_ACCESS_KEY,
  },
});

const getSentiment = async (sentence) => {
  let response;

  // Prepare input for command
  var input = {
    LanguageCode: 'en' /* required */,
    Text: sentence /* required */,
  };

  try {
    const command = new DetectSentimentCommand(input);
    response = await client.send(command);
  } catch (error) {
    console.log('Error: ', error);
  } finally {
    return (
      {
        sentimentScore: response.SentimentScore,
        sentiment: response.Sentiment,
      } ?? null
    );
  }
};

export default {
  getSentiment,
};
