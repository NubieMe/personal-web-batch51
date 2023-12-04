const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'final/src/assets/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileExt = path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExt)
    }
  })
  
  const upload = multer({ storage })

  module.exports = upload