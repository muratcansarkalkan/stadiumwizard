const { google } = require('googleapis')

function download(id) {
    ipcRenderer.send('set-download', id);
}

async function viewFolder(resourceId) {
    try {
        // https://googleapis.dev/nodejs/googleapis/latest/
        // Contains OAuth and scopes
        const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: 'https://www.googleapis.com/auth/drive.readonly'
        })

        // Shortens googleDrive functions
        const drive = google.drive({ version: 'v3', auth })

        // Gets list of files
        const res = await drive.files.list({
            q: `'${resourceId}' in parents`,
            fields: `nextPageToken, files(*)`,
            spaces: 'drive',
        });

        const headers = document.querySelector(".stadium_headers")
        const listOfStadiums = document.querySelector(".list_of_stadiums")
        // Clear the table
        headers.innerHTML = null
        listOfStadiums.innerHTML = null

        // Table headers
        const actionHeader = document.createElement('th')
        actionHeader.innerHTML = 'Action'
        actionHeader.scope = 'col'
        const nameHeader = actionHeader.cloneNode(true)
        nameHeader.innerHTML = 'Name'
        headers.append(nameHeader, actionHeader)

        // Fill the table
        res.data.files.forEach(function (file) {
            // Table row
            const row = document.createElement('tr')
            // Name column
            const nameCol = document.createElement('td')
            nameCol.innerHTML = file.name
            row.appendChild(nameCol)
            // Button column
            const buttonCol = document.createElement('td')
            // Action button
            const actionButton = document.createElement('button')
            actionButton.classList.add('btn')
            actionButton.id = `button_${file.id}`

            // Set button action type
            if (file.mimeType == 'application/x-7z-compressed') {
                actionButton.classList.add('btn-success')
                actionButton.addEventListener('click', () => download(file.id))
                actionButton.innerHTML = 'Download'
            } else {
                actionButton.classList.add('btn-primary')
                actionButton.addEventListener('click', () => viewFolder(file.id))
                actionButton.innerHTML = 'Navigate'
            }

            // Add to view
            buttonCol.appendChild(actionButton)
            row.appendChild(buttonCol)
            listOfStadiums.appendChild(row)
        })
    } catch (err) {
        console.error(err)
    }
}
