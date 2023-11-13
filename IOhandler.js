/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 11/08/23
 * Author: Ahmed Calif 
 *
 */
const AdmZip = require ("adm-zip");
const { pipeline } = require("stream");
 const fs = require("fs/promises");
 const PNG = require("pngjs").PNG;
 const path = require("path");

const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    try {
      const zip = new AdmZip(pathIn);
      zip.extractAllToAsync(pathOut, true, (err) => {
        if (err) reject(err);
        else {
          console.log("Extraction operation completed");
          resolve();
        }
      });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

  function readDir(dirPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(dirPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          const pngFiles = files.filter((file) =>
            path.extname(file).toLowerCase() === ".png"
          );
          const filePaths = pngFiles.map((file) => path.join(dirPath, file));
         // console.log(filePaths)
          resolve(filePaths);
        }
      });
    });
  }


  const grayScale = (pathIn, pathOut) => {
    return new Promise((resolve, reject) => {
     const rs =  fs.createReadStream(pathIn);
      
    const pngStream = new PNG({
          filterType: 4,
        })
      
      pngStream.on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
  
                  let R = this.data[idx];
                  let G = this.data[idx + 1];
                  let B = this.data[idx + 2];
                  const gray = (R + G + B) / 3;
  
                      // invert color
                      this.data[idx] = gray
                      this.data[idx + 1] = gray
                      this.data[idx + 2] = gray
  
          }
        }

        pipeline(
          rs,
          pngStream,
          this.pack(),
          fs.createWriteStream(pathOut).on("finish", resolve(("All images are Filtered"))),
          (err) => { if (err) console.log(err)}
        )
  
      });
    })
  };


module.exports = {
  unzip,
  readDir,
  grayScale
};
