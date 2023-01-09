// Equivalent to Python's OS
const fs = require('fs')
const testFolder = './test/';
const { google } = require('googleapis')

const filerealId = '1NobeewSi5KG-AejPotWky7e22egEUWT_'

const GOOGLE_API_FOLDER_ID = '19O6WJS6QKnLnmP9I_q-bNORcV490hkNi'

const http = require('http'); // or 'https' for https:// URLs

function getFile(fileId) {
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
    });

    const drive = google.drive({ version: 'v3', auth });
    const rest = drive.files.get({ fileId: fileId, fields: '*' });

    rest.then(function(result) {
        resultnew = result.data.name;
        console.log(resultnew)
    })
    
}
getFile(filerealId)