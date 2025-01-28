const { storage } = require("../config/firebaseAuth");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("No file uploaded");
            return;
        }

        const fileName = `products/${uuidv4()}${path.extname(file.originalname)}`;
        const fileUpload = storage.file(fileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on("error", (error) => {
            reject(error);
        });

        blobStream.on("finish", async () => {
            const publicUrl = `https://storage.googleapis.com/${storage.name}/${fileName}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

module.exports = { uploadImage };