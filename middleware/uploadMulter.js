import multer from "multer";
import util from "util";
const storage = multer.diskStorage({
    destination: ({ des }, file, callback) => {
        callback(null, des);
    },
    filename: (req, file, callback) => {
        const math = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        if (math.indexOf(file.mimetype) === -1) {
            return callback("Only allow to upload image png, jpg, jpeg or gif", null);
        }
        callback(null, Date.now() + "-" + file.originalname);
    },
});

const multipleUpload = multer({ storage: storage }).array("file");
const singleUpload = multer({ storage: storage }).single("file");

export const multipleUploadFile = util.promisify(multipleUpload);
export const singleUploadFile = util.promisify(singleUpload);