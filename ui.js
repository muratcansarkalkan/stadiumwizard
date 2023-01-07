function UI() {
    this.btn_view = document.querySelector(".btn_view"),
    this.btn_main = document.querySelector(".btn_main")
}

UI.prototype.viewData = function(values) {
    let tag = ``;
    values.forEach(function(file) {
    tag = tag + `<tr><td>${file.name}</td><td><button class="btn btn-primary btn_view" id="${file.id}" onClick="viewer('${file.id}');">Navigate</button></td></tr>`;
    })
    tableHeader = `<th scope="col">Team</th><th scope="col">ID</th>`;
    document.querySelector(".stadium_headers").innerHTML = tableHeader;
    document.querySelector(".list_of_stadiums").innerHTML = tag;
}