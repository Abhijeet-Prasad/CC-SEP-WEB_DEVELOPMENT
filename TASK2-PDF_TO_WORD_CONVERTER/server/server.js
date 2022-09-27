const express = require('express');
const fileUpload = require('express-fileupload');
const { PDFNet } = require('@pdftron/pdfnet-node');
const fsPromises = require("fs/promises");
const dotenv = require("dotenv")
const cors = require('cors');
const fs = require('fs')

const DIR = './ConvertedFiles'

if(!fs.existsSync(DIR)){
  fs.mkdirSync(DIR)
}
dotenv.config()

const app = express();

app.use(cors());
app.use(fileUpload());

let file = "";
let wordFile = ""

async function convertFile() {
    await PDFNet.addResourceSearchPath('./lib/');
  
    // check if the module is available
    if (!(await PDFNet.StructuredOutputModule.isModuleAvailable())) {
      return;
    }

    wordFile = file.name.substring(0,file.name.lastIndexOf('.')) + '.docx'

    await PDFNet.Convert.fileToWord(`${__dirname}/${file.name}`, `${__dirname}/ConvertedFiles/${wordFile}`)
}


const deleteFile = async (path) => {
    try {
        await fsPromises.unlink(path);
    }
    catch (err) {
        console.log("Error Deleting the files")
        console.error(err);
    }
};


app.post('/ConvertToWord', async (req, res) => {

    if(req.files === null){
        return res.status(400).json({msg: 'No file uploaded'});
    }

    file = req.files.file;

    file.mv(`${__dirname}/${file.name}`, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
    })

    await PDFNet.runWithCleanup(convertFile, process.env.MY_API);

    deleteFile(`${__dirname}/${file.name}`)
    res.download(`${__dirname}/ConvertedFiles/${wordFile}`, wordFile)
});

app.listen(5000, () => console.log('Server Started'));