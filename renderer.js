const { ipcRenderer } = require('electron');
const Main = require('electron/main');

const btn = document.querySelector('.btn_get')

const btn_main = document.querySelector('.btn_main')
const btn_view = document.querySelector('.btn_view')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
    const filePath = await ipcRenderer.invoke('set-download').then((result) => {
        console.log(result);
    })
    filePathElement.innerText = "Successfully downloaded at: " + filePath
})

let viewData = function(values) {
    let tag = ``;
    values.forEach(function(file) {
    if (file.mimeType == 'application/x-7z-compressed'){
    tag = tag + `<tr><td>${file.name}</td><td><button class="btn btn-success btn_get" id="${file.id}" onclick="">Download</button></td></tr>`;
    }
    else {
    tag = tag + `<tr><td>${file.name}</td><td><button class="btn btn-primary btn_view" id="${file.id}" onclick="viewFolder('${file.id}');">Navigate</button></td></tr>`;
    }
    })
    tableHeader = `<th scope="col">Team</th><th scope="col">ID</th>`;
    document.querySelector(".stadium_headers").innerHTML = tableHeader;
    document.querySelector(".list_of_stadiums").innerHTML = tag;
}

