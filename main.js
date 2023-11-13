const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:Ahmed Calif
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

IOhandler.unzip(zipFilePath, pathUnzipped);
IOhandler.readDir(pathUnzipped)
.then((files => {
    const promiseArr = files.map(f => {
        const newPath = path.basename(f);
        const outputPath = path.join(pathProcessed, newPath)
       return IOhandler.grayScale(f, outputPath)
    }) 
    Promise.all([
        promiseArr
    ])
    .then(() => console.log("All images are filtered"))
}))
.catch(err => console.log(err));




