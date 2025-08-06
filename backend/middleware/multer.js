const multer = require('multer');

const storage = multer.memoryStorage();
const singleUpload = multer({storage}).single("file");
const multipleUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
}).array('files'); 

module.exports = {singleUpload, multipleUpload};