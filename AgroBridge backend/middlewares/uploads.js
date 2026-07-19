const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, JPEG and PNG files are allowed"
            ),
            false
        );

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});
const audioStorage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        cb(
            null,
            "audio-" +
            Date.now() +
            path.extname(file.originalname || ".webm")
        );

    }

});

const audioFilter = (req, file, cb) => {

    const allowedAudioTypes = [

        "audio/webm",

        "audio/wav",

        "audio/mpeg",

        "audio/mp3",

        "audio/ogg",

        "audio/x-wav"

    ];

    if (allowedAudioTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error("Only audio files are allowed"),
            false
        );

    }

};

const audioUpload = multer({

    storage: audioStorage,

    fileFilter: audioFilter,

    limits: {

        fileSize: 20 * 1024 * 1024

    }

});

module.exports = {upload, audioUpload};