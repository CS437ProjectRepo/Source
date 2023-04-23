const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const stream = require('stream');
require('dotenv').config()
const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
const scopes = ['https://www.googleapis.com/auth/drive'];
const folderId = "1YHDfQNxN9tatehJWb0epepSoS3gYuhhn";

let auth = null;

function getAuthToken() {
    if (!auth || checkTokenExpiration(auth.credentials)) {
      const now = Math.floor(Date.now() / 1000);
      const token = jwt.sign(
        {
          iss: serviceAccountKey.client_email,
          scope: scopes.join(' '),
          aud: 'https://oauth2.googleapis.com/token',
          exp: now + 3600,
          iat: now,
        },
        serviceAccountKey.private_key,
        { algorithm: 'RS256' }
      );
  
      auth = new google.auth.JWT({
        email: serviceAccountKey.client_email,
        key: serviceAccountKey.private_key,
        scopes: scopes,
        access_token: token,
      });
    }
    return auth;
}
  
function checkTokenExpiration(credentials) {
    const now = new Date().getTime();
    const expiryDate = new Date(credentials.expiry_date).getTime();
    return expiryDate - now < 60 * 60 * 1000; // check if token will expire in less than an hour
}

const createFile =  async (fileObject) => {
    const drive = google.drive({ version: 'v3', auth: getAuthToken() });
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await drive.files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        parents: [folderId],
      },
      fields: 'id,name',
    });
    return data.id;
};

function deleteFile(fileId) {
    const drive = google.drive({ version: 'v3', auth: getAuthToken() });

    // return new Promise((resolve, reject) => {
    //     drive.files.delete({ fileId }, (err, res) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(res.data);
    //         }
    //     });
    // });
    
    drive.files.delete({fileId}, (err, res) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
        return;
      }
    });
}

module.exports = {
    createFile,
    deleteFile
}
