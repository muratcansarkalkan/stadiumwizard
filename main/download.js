// Equivalent to Python's OS
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')
const { app } = require('electron')

// https://stackoverflow.com/a/41355384/8295460
function printProgress(progress) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Downloaded ${progress}%`);
}

async function downloadFile(fileId) {
    console.log('Starting download for:', fileId)
    // https://googleapis.dev/nodejs/googleapis/latest/
    const auth = new google.auth.GoogleAuth({
        keyFile: './googlekey.json',
        scopes: 'https://www.googleapis.com/auth/drive.readonly'
    })
    const drive = google.drive({ version: 'v3', auth })

    try {
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
        // Download the file to the root of the app
        const filePath = path.join(app.getAppPath(), fileName)
        const localFile = fs.createWriteStream(filePath)
        // Bytes left to download
        let downloaded = metadata.data.size

        file.data
            .on('data', (d) => {
                downloaded -= d.length
                // Percent of what has been downloaded
                const percent = (metadata.data.size - downloaded) * 100 / metadata.data.size
                printProgress(percent.toFixed(2))
            })
            .on("error", err => {
                process.stdout.write("\n");
                console.log("Error", err);
            })
            .on("end", () => {
                process.stdout.write("\n");
                console.log(`File saved to: ${filePath}`);
            })
            .pipe(localFile);

        return filePath;
    } catch (err) {
        console.error("Can't get file", err)
    }
}

module.exports = { downloadFile }
