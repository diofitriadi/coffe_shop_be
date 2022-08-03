//untuk mengupload gambar di database
const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //guna original name untuk mendefinisikan nama file dan exstensi nya
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
}) 

const fileExtension = (req, file, value) => { // file validation
    const ext = path.extname(file.originalname)
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return value(new Error('Only images are allowed'))
    }
    value(null, true)
}
    const maxSize = { // limit size image
    fileSize: 1 * 2000 * 2000 //2000000 bytes = 2mb
    }
    const uploadMovies = multer({
    storage: storage,
    fileFilter: fileExtension,
    limits: maxSize
    }).single('cover')

const upload = (req, res, next) => {
    uploadMovies(req, res, (err) => {
        if(err instanceof multer.MulterError){
            return res.json({
            success: false,
            message: "File must have less than 2mb"
            })
        } else if(err){
            return res.json({
                success: false,
                message: "File must be jpg, jpeg, png, or gif"
        })
        }
    next()
    })
}

module.exports = upload