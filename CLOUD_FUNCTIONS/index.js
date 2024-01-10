/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const cors = require('cors')({ origin: true});

const {SessionsClient} = require('dialogflow');

const serviceAccount ={
  "type": "service_account",
  "project_id": "stat-app-dev-403807",
  "private_key_id": "9caad4928a0fb810911d7f19d22c4095533d10ad",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXmgHJ+kGzDL1h\nsDQrRdn576/4noet8TjFBhLXc+YNC+69npnnxC7kUSR3ndqq3jaewe4NdBTAcN5h\nlhf6JXQ1ptAErxPbZXcf94I6p5WmM+iz0r+yrRooOhDjxJ+u0AkhsswhMGmallgf\n1CRRC6iazARUaiIunSZcNgloLdRVQBnIIb7Qapcc29MPoXWSJ0LebkcBbDXAPwIb\nQRJTUKgZfDxNJTCD3SMuJG/+9yxDeTVOwVbbZDFM0XMJGlNAYmJ0C68onaL9XROp\no2zXkFAunzyuaO5PkD3RX6qQzSnfaxQaW1ePY0CKRZNJLHVvegQC3yC5HZGx4Hxs\nJ30brM2hAgMBAAECggEAHg31mdWnrbfyWYoFpaiI8LBQahD/o//E+eZc2OLMsjxx\n3ZyyNUzi4PenK6GbRrGcEXgv2fHv5UDbDWyknz5KnhJOfgc5gA7LAYbfhgJQPC1h\nTjkTMPh5TY1JaOZDo/PxQ4F/T3saDIAOw2yasIiHqfyVRSjvUt9rye8aiVFAnY+0\nC6MyrXmxoIsYqT+161WcdwDRM1RQES759kCauKZgnbRg0eBtezlWKj0La9rCJn+i\nko0F8aLrVw6ItmmQMNwvAta6ox4zniqITw79IQRPmeK3Jet1RNTooWoyjMnnKyqa\nmnaEV8EOUPm6UH+zx9TbUerkcrAXeek0u2S1kGAV2QKBgQDJRrGBgn0wdcjw/w0F\nsB4x9QCa5Eud0Y3qZ5ksZ2Nqfqvx1ygW++u/1rdPkGBt7oZWpOZiH9nvISbTsoUS\nw8K4sGJxg/+3SS3BJSUpFjOLv3HpNOjZ19PgRkrteUMp1v6sAQC0SAcigjIOjA/d\nwkHNj3/bR+Pyhp1I+fxsngjkbQKBgQDA0dgmg4ERcwMiw8wRKp+G+92Qwx7kIuzj\n74s61F548NSETkzzoMXshuDh9CCAavZB5bueDY8vUxEEYTUsvEJZXO5mstsgI0+E\nxR2LpOHDykBFPvLhM/EaYH6yIxEPT830R46Kho0wG+q+8uH38ri6GGpyJfnY+sIh\nFIcU1/gFhQKBgETq18yoiYUWT391VVglPbGNWm+uy9V180nXvzLdE8VbKjTcnvV/\nvPEq7AlqPhpmGcmBHQFsNosSpuDFt5r9PKdQfeSwddakT+5acabn2y52luJrI2+z\n3vBkITO+2ahx3TG4Bi20m/zM56bjfmtIII/qGrVSoFJilWhvcGcglZrhAoGAFDZr\nKC5k20VpML3BqJMFQgspAMHTfSrEFmjH+ZTFinwEaxIiMu/Jj6/b5xPGTG/p/KJu\ndnUJa3aTtBfUkSny8pcxToa1Pbs13L8lB7xzBikvb5LXtw/Q2GkBHv9aDHbbKh5O\nLOtJ5Z8njni7g1hoUOm6Ttj4ReyTaRBT0LWLBFkCgYBrFagflRDLuNIdfv06PEuI\nFos9PBxlc31NTVLRKhvlblVLKnzls4LG+DM4/jZXS9p3pnnrhF4POttBdUI7+shH\nPdOZvQsv/DjriyFVtF1q9dml5QbGYpPuTHcNsdNTIT1SjdcUuJ4xObLZ465DT1pd\n/UmKLm78ddTiNxvcGqhjEg==\n-----END PRIVATE KEY-----\n",
  "client_email": "stat-app-dev-403807@appspot.gserviceaccount.com",
  "client_id": "100363559091702119107",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/stat-app-dev-403807%40appspot.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


exports.dialogflowGateway = (request, response) => {
  cors(request, response, async () => {
    console.log(request.body);
const { queryInput, sessionId } = JSON.parse(JSON.stringify(request.body));
console.log(request.body);

    const sessionClient = new SessionsClient({ credentials: serviceAccount });
    const session = sessionClient.sessionPath(serviceAccount.project_id, sessionId);
   
    const request1 = {
        session: session,
        queryInput: {
          text: {
            text:queryInput.text,
            languageCode: queryInput.languageCode
          }
        }
      }
    const responses =sessionClient.detectIntent(request1).then(data=>{
      response.send(data);
    })
     
      

   });
};