// Equivalent to Python's OS
const fs = require('fs')
const testFolder = './test/';
const { google } = require('googleapis')

const filerealId = '1NobeewSi5KG-AejPotWky7e22egEUWT_'

const GOOGLE_API_FOLDER_ID = '19O6WJS6QKnLnmP9I_q-bNORcV490hkNi'

async function uploadFile(file) {
    try {
        let newfile = (testFolder + file).split('/')

        const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive'],
        })

        const driveService = google.drive({ version: 'v3', auth })

        const fileMetaData = {
            'name': newfile[newfile.length - 1],
            'parents': [GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: 'text/plain',
            body: fs.createReadStream(file)
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })
        return response.data.id

    } catch (err) {
        console.log('Upload file error', err)
    }
}

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        uploadFile(testFolder + file).then(data => {
            console.log(data)
            //https://drive.google.com/uc?export=view&id=
        })
    });
});