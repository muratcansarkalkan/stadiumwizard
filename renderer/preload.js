const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    downloadFile: (fileId) => ipcRenderer.send('downloadFile', fileId)
})