// Equivalent to Python's OS
const fs = require('fs')

const { google } = require('googleapis')
const { redis } = require('googleapis/build/src/apis/redis')

const folderId = '1-1c1s9XpXO2O71KKP66DVI0YB8lM2L1g'
// const folderId = '1J2RFNNLL_Mn8ZAZ8FjDC-ikB3z-AtCGY'

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
        console.log('Found file:', file.mimeType);
        });

        let tag = ``;
        res.data.files.forEach(function(file) {
        if (file.mimeType == 'application/x-7z-compressed'){
        tag = tag + `<tr><td>${file.name}</td><td><button class="btn btn-success btn_get" id="${file.id}" onclick="download('${file.id}');">Download</button></td></tr>`;
        }
        else {
        tag = tag + `<tr><td>${file.name}</td><td><button class="btn btn-primary btn_view" id="${file.id}" onclick="viewFolder('${file.id}');">Navigate</button></td></tr>`;
        }
        })
        tableHeader = `<th scope="col">Team</th><th scope="col">ID</th>`;
        document.querySelector(".stadium_headers").innerHTML = tableHeader;
        document.querySelector(".list_of_stadiums").innerHTML = tag;
        
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
}

// let viewDataInferior = function(values) {
//     let tag = ``;
//     values.forEach(function(file) {
//     if (file.mimeType == 'application/x-7z-compressed'){
//     tag = tag + `<tr><td>${file.name}</td><td><button class="btn btn-success btn_download" id="${file.id}" onClick="downloadFile('${file.id}');">Download</button></td></tr>`;
//     }
//     else {
//     tag = tag + `<tr><td>${file.name}</td><td><button class="btn btn-primary btn_view" id="${file.id}" onclick="viewFolder('${file.id}');">Navigate</button></td></tr>`;
//     }
//     })
//     tableHeader = `<th scope="col">Team</th><th scope="col">ID</th>`;
//     document.querySelector(".stadium_headers").innerHTML = tableHeader;
//     document.querySelector(".list_of_stadiums").innerHTML = tag;
// }

// btn_view.addEventListener("click", function() {
//     document.querySelector(".list_of_stadiums").innerHTML = ``;
//     console.log('Subfolder tracking');
//     let promise = viewFolder(folderId);
//     Promise.all([promise]).then((values) => {
//         viewDataInferior(values[0]);
//     });
// });

// function viewer(uniqueId){
//     let promise = viewFolder(uniqueId);
//     Promise.all([promise]).then((values) => {
//         ui.viewData(values[0]); 
//     });
// };

// application/vnd.google-apps.folder
// application/x-7z-compressed