const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json");
const { getStorage } = require("firebase-admin/storage");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://marketplace-tic.firebaseio.com",
    storageBucket: "marketplace-tic.firebasestorage.app", 
});

const auth = admin.auth();
const storage = getStorage().bucket(); 

module.exports = { auth, storage };