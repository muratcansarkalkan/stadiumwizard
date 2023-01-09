const { app, BrowserWindow, ipcMain } = require('electron')
const { downloadFile } = require('./main/download')

function createWindow() {
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

  ipcMain.on('set-download', (event, fileId) => {
    downloadFile(fileId);
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
