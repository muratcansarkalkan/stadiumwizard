// Equivalent to Python's OS
const fs = require('fs')
const { google } = require('googleapis')

const folderId = '10IAd37aNRGGuw1fl6MSOIRBybw9AdEdT'
// const folderId = '17K7jQFAtGbxEHXElDPEd_KIdRJNcHHrk'

async function viewFolder(filerealId){
    try{
        
        // https://googleapis.dev/nodejs/googleapis/latest/
        // Contains OAuth and scopes
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

        // Shortens googleDrive functions
        const drive = google.drive({version: 'v3', auth})

        // Generates list
        const subFolders = [];

        // Gets list of files
        const res = await drive.files.list({
            q: `'${filerealId}' in parents`,
            fields: `nextPageToken, files(*)`,
            spaces: 'drive',
          });

        // Pushes res files content to subFolders
        Array.prototype.push.apply(subFolders, res.files);

        // Logs file name and ID for each element of subFolders
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