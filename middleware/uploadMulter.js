import multer from "multer";
import util from "util";
const storage = multer.diskStorage({
    destination: ({ up }, file, cb) => {
        cb(null, up);
    },
    filename: (req, file, cb) => {
        const math = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        if (math.indexOf(file.mimetype) === -1) {
            return cb("Only allow to upload image png, jpg, jpeg or gif", null);
        }
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const multipleUpload = multer({ storage: storage }).array("file");
const singleUpload = multer({ storage: storage }).single("file");

export const multipleUploadFile = util.promisify(multipleUpload);
export const singleUploadFile = util.promisify(singleUpload);