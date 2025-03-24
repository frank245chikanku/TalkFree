import multer from 'multer'; 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },  

    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now () ) 
    }
})

const upload = multer({ storage }).array('image') 

export { upload as uploadImages }  