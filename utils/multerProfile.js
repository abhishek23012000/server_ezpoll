let multer = require("multer");
const path = require("path");
//Specify the storage engine
// let upload = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },

// });

const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
    6;
  },
});
const profileUpload = multer({
  storage: filestorage,
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      done(null, true);
    } else {
      //prevent the upload
      var newError = new Error("File type is incorrect");
      newError.name = "MulterError";
      done(newError, false);
    }
  },
});

module.exports = profileUpload;
