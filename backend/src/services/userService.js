const { auth } = require("../config/firebaseAuth"); 
const { db } = require("../config/firebase");
const { getDoc, setDoc, doc } = require("firebase/firestore");


const registerUser = async (email, password, firstName, lastName) => {
    try {
        
        const userRecord = await auth.createUser({
            email,
            password,
        });

        const userRef = doc(db, "Users", userRecord.uid);
        await setDoc(userRef, {
            uid: userRecord.uid,
            email: userRecord.email,
            lastName: lastName,
            firstName: firstName
        });

        return { success: true, uid: userRecord.uid, email: userRecord.email };
    } catch (error) {
        console.error("Error registering user:", error.message);
        return { success: false, error: error.message };
    }
};


const loginUser = async (idToken) => {
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const token = await auth.createCustomToken(decodedToken.uid);

        return { success: true, uid: decodedToken.uid, token };
    } catch (error) {
        console.error("Error verifying ID token:", error.message);
        return { success: false, error: "Invalid token" };
    }
};

const getUserById = async (uid) => {
    try {
        const userRef = doc(db, "Users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return { success: true, user: userSnap.data() };
        } else {
            return { success: false, error: "User not found" };
        }
    } catch (error) {
        console.error("Error getting user:", error.message);
        return { success: false, error: error.message };
    }
};

module.exports = { registerUser, loginUser, getUserById };