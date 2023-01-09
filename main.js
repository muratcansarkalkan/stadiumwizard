const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const fs = require('fs')
const { google } = require('googleapis')

ipcMain.on('set-download', async (event, fileId) => {
  try{
      console.log(fileId);
      const auth = new google.auth.GoogleAuth({
        keyFile: './googlekey.json',
        scopes: [
            'https://www.googleapis.com/auth/drive.readonly',
        ]
      })
      const drive = google.drive({ version: 'v3', auth })
      // https://googleapis.dev/nodejs/googleapis/latest/
      // Contains OAuth and scopes

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
})

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
  ipcMain.handle('set-download', (event, fileId) => {
    downloadFile(fileId);
  })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
