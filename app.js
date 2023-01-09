const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const fs = require('fs')
const path = require('path')
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

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }

    })
  
    win.loadFile('main.html')
  }

  app.whenReady().then(() => {
    ipcMain.handle('set-download', downloadFile)
    createWindow()
  })
