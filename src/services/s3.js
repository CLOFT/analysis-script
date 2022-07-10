// load env
import { constants } from '../config/index.js';

// node-core modules
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// AWS SDK for S3
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';

// Declare S3 instance
const s3Client = new S3({
  region: constants.REGION,
  credentials: {
    accessKeyId: constants.ACCESS_KEY_ID,
    secretAccessKey: constants.SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (filePath) => {
  const file = filePath; // Path to and name of object. For example '../myFiles/index.js'.
  const fileStream = fs.createReadStream(file);

  // Set the parameters
  const uploadParams = {
    Bucket: constants.S3_BUCKET,
    // Add the required 'Key' parameter using the 'path' module.
    Key: `reports/${path.basename(file)}`,
    // Add the required 'Body' parameter
    Body: fileStream,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log('Success ... ', data);
    return {
      message: 'Upload success',
    };
  } catch (err) {
    console.log('Error : ', err);
  }
};

export default {
  uploadToS3,
};
