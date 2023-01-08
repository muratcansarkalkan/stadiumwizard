const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const fs = require('fs')
const { google } = require('googleapis')

async function downloadFile(fileId){
  try{
      const auth = new google.auth.GoogleAuth({
        keyFile: './googlekey.json',
        scopes: [
            'https://www.googleapis.com/auth/drive.readonly',
        ]
      })
      const drive = google.drive({ version: 'v3', auth })
      // https://googleapis.dev/nodejs/googleapis/latest/
      // Contains OAuth and scopes

      fileId = '1WpbaIPPgkkXbbkQUNkCsc6EVFuvAegDi'
        // https://googleapis.dev/nodejs/googleapis/latest/drive/classes/Resource$Files.html#get
        const [metadata, file] = await Promise.all(
          [
              drive.files.get({ fileId, fields: '*' }),
              drive.files.get({
                  fileId,
                  alt: 'media',
              }, { responseType: "stream" })
          ])
      
      const fileName = metadata.data.name
      const filePath = path.join(__dirname, fileName)
      const localFile = fs.createWriteStream(filePath)
      // Bytes left to download
      let downloaded = metadata.data.size

      console.log(`Downloading: ${fileName}`)
      
      file.data
          .on('data', (d) => {
              // Percent of what has been downloaded
          })
          .on("error", err => {
              console.log("Error", err);
          })
          .on("end", () => {
              console.log(`File saved to: ${filePath}`);
          })
          .pipe(localFile);

      return filePath;
  } catch (err) {
      // TODO(developer) - Handle error
      throw err;
  }
}

// async function viewFolder(filerealId){
//   try{

//       // https://googleapis.dev/nodejs/googleapis/latest/
//       // Contains OAuth and scopes
//       const auth = new google.auth.GoogleAuth({
//           keyFile: './googlekey.json',
//           scopes: [
//               'https://www.googleapis.com/auth/drive',
//               'https://www.googleapis.com/auth/drive.appdata',
//               'https://www.googleapis.com/auth/drive.file',
//               'https://www.googleapis.com/auth/drive.metadata',
//               'https://www.googleapis.com/auth/drive.metadata.readonly',
//               'https://www.googleapis.com/auth/drive.photos.readonly',
//               'https://www.googleapis.com/auth/drive.readonly',
//           ]
//       })

//       // Shortens googleDrive functions
//       const drive = google.drive({version: 'v3', auth})

//       // Generates list
//       const subFolders = [];

//       // Gets list of files
//       const res = await drive.files.list({
//           q: `'${filerealId}' in parents`,
//           fields: `nextPageToken, files(*)`,
//           spaces: 'drive',
//         });

//       // Pushes res files content to subFolders
//       Array.prototype.push.apply(subFolders, res.files);

//       // Logs file name and ID for each element of subFolders
//       // res.data.files.forEach(function(file) {
//       // console.log('Found file:', file.mimeType);
//       // });
//       return res.data.files;
//   } catch (err) {
//       // TODO(developer) - Handle error
//       throw err;
//   }
// }

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
      // preload: path.join(__dirname, 'preload.js'),
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools();

}

app.whenReady().then(() => {
  ipcMain.handle('set-download', downloadFile)
  // ipcMain.handle('set-view', (event, folderId) => {
  //   const result = viewFolder(folderId);
  //   return result
  // })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
