// Equivalent to Python's OS
const fs = require('fs')
const testFolder = './test/';
const { google } = require('googleapis')

const filerealId = '11je-QQH6tjFAxmwbsnoIZFPKjzUj9Ol5'

const http = require('http'); // or 'https' for https:// URLs

async function downloadFile(filerealId){
    try{
        
        // https://googleapis.dev/nodejs/googleapis/latest/
        const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.appdata',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/drive.metadata',
                'https://www.googleapis.com/auth/drive.metadata.readonly',
                'https://www.googleapis.com/auth/drive.photos.readonly',
                'https://www.googleapis.com/auth/drive.readonly',
            ]
        })

        const drive = google.drive({version: 'v3', auth})

        // https://googleapis.dev/nodejs/googleapis/latest/drive/classes/Resource$Files.html#get
        const file = await drive.files.get({
            fileId: filerealId,
            alt: 'media',
          }, {responseType: "stream"});

        const metadata = drive.files.get({ fileId: filerealId, fields: '*' });

        metadata.then(function(result) {
            resultnew = result.data.name;
            const localFile = fs.createWriteStream(resultnew);
            file.data
              .on("end", () => {
                 console.log("Done");
              })
              .on("error", err => {
                 console.log("Error", err);
              })
              .pipe(localFile);
        })
    
        return file.status;
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
}

downloadFile(filerealId)