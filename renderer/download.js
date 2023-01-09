const { ipcRenderer } = require('electron');
const Main = require('electron/main');

const btn = document.querySelector('.btn_get')

btn.addEventListener('click', async () => {
    const filePath = await ipcRenderer.invoke('set-download').then((result) => {
        console.log(result);
    })
    filePathElement.innerText = "Successfully downloaded at: " + filePath
})