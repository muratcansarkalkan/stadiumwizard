// Equivalent to Python's OS
const fs = require('fs')
const { google } = require('googleapis')

const folderId = '1-1c1s9XpXO2O71KKP66DVI0YB8lM2L1g'

async function viewFolder(filerealId){
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

        const subFolders = [];

        // https://googleapis.dev/nodejs/googleapis/latest/drive/classes/Resource$Files.html#get
        const res = await drive.files.list({
            q: `'${filerealId}' in parents`,
            fields: `nextPageToken, files(*)`,
            spaces: 'drive',
          });

        Array.prototype.push.apply(subFolders, res.files);
        res.data.files.forEach(function(file) {
        console.log('Found file:', file.name, file.id);
        });
        return res.data.files;
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
}

viewFolder(folderId)