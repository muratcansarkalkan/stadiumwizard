const { app, BrowserWindow, ipcMain } = require('electron')
const { downloadFile } = require('./main/download')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'renderer', 'preload.js'),
    }
  })

  // Register IPC messaging
  // ipcMain.on('downloadFile', (_, fileId) => {
  //   downloadFile(fileId)
  // })

  win.loadFile('main.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});