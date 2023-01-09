<<<<<<< HEAD:view.js
// Equivalent to Python's OS
const fs = require('fs')
const btn_main = document.querySelector('.btn_main')
const { google } = require('googleapis')
=======
const ui = new UI();

const { google } = require('googleapis');
>>>>>>> 60cd5e2e8024498770077d8584b1ee521995225f:renderer/view.js

const folderId = '1-1c1s9XpXO2O71KKP66DVI0YB8lM2L1g'
// const folderId = '1J2RFNNLL_Mn8ZAZ8FjDC-ikB3z-AtCGY'

async function viewFolder(filerealId) {
    try {

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
        const drive = google.drive({ version: 'v3', auth })

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
        res.data.files.forEach(function (file) {
            console.log('Found file:', file.mimeType);
        });
        return res.data.files;
    } catch (err) {
        console.error(err)
        // TODO(developer) - Handle error
        throw err;
    }
}

<<<<<<< HEAD:view.js
let viewDataInferior = function(values) {
    let tag = ``;
    values.forEach(function(file) {
    if (file.mimeType == 'application/x-7z-compressed'){
    tag = tag + `<tr><td>${file.name}</td><td><button class="btn btn-success btn_download" id="${file.id}" onClick="downloadFile('${file.id}');">Download</button></td></tr>`;
    }
    else {
    tag = tag + `<tr><td>${file.name}</td><td><button class="btn btn-primary btn_main" id="${file.id}">Navigate</button></td></tr>`;
    }
    })
    tableHeader = `<th scope="col">Team</th><th scope="col">ID</th>`;
    document.querySelector(".stadium_headers").innerHTML = tableHeader;
    document.querySelector(".list_of_stadiums").innerHTML = tag;
}

btn_main.addEventListener("click", function() {
=======
ui.btn_main.addEventListener("click", function () {
>>>>>>> 60cd5e2e8024498770077d8584b1ee521995225f:renderer/view.js
    let promise = viewFolder(folderId);
    Promise.all([promise]).then((values) => {
        viewDataInferior(values[0]);
    });
});

<<<<<<< HEAD:view.js
// function viewer(uniqueId){
//     let promise = viewFolder(uniqueId);
//     Promise.all([promise]).then((values) => {
//         ui.viewData(values[0]); 
//     });
// };
=======
function viewer(uniqueId) {
    let promise = viewFolder(uniqueId);
    Promise.all([promise]).then((values) => {
        ui.viewData(values[0]);
    });
};
>>>>>>> 60cd5e2e8024498770077d8584b1ee521995225f:renderer/view.js

// application/vnd.google-apps.folder
// application/x-7z-compressed