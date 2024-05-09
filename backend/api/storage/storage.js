const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../svgs/'); // Destination folder for uploaded SVG files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use original file name
    }
  });
const upload = multer({ storage: storage });

module.exports = {
    upload
};