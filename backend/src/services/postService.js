const { db } = require("../config/firebase");
const { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where } = require("firebase/firestore");

const createPost = async (title, description, price, userId, imageUrl) => {
    try {
        const newPost = {
            title,
            description,
            price,
            userId, 
            createdAt: new Date().toISOString(),
            imageUrl
        };

        const docRef = await addDoc(collection(db, "Posts"), newPost);
        return { success: true, id: docRef.id, ...newPost };
    } catch (error) {
        console.error("Error creating post:", error.message);
        return { success: false, error: error.message };
    }
};

const getAllPosts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Posts"));
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { success: true, posts };
    } catch (error) {
        console.error("Error getting posts:", error.message);
        return { success: false, error: error.message };
    }
};

const getPostById = async (postId) => {
    try {
        const postRef = doc(db, "Posts", postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            return { success: true, post: postSnap.data() };
        } else {
            return { success: false, error: "Post not found" };
        }
    } catch (error) {
        console.error("Error getting post:", error.message);
        return { success: false, error: error.message };
    }
};

const getPostsByUser = async (userId) => {
    try {
        const postsRef = collection(db, "Posts");
        const q = query(postsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { success: true, posts };
    } catch (error) {
        console.error("Error getting user's posts:", error.message);
        return { success: false, error: error.message };
    }
};

const updatePost = async (postId, updates) => {
    try {
        const postRef = doc(db, "Posts", postId);
        await updateDoc(postRef, updates);

        return { success: true, message: "Post updated successfully" };
    } catch (error) {
        console.error("Error updating post:", error.message);
        return { success: false, error: error.message };
    }
};

const deletePost = async (postId) => {
    try {
        const postRef = doc(db, "Posts", postId);
        await deleteDoc(postRef);

        return { success: true, message: "Post deleted successfully" };
    } catch (error) {
        console.error("Error deleting post:", error.message);
        return { success: false, error: error.message };
    }
};

module.exports = { createPost, getAllPosts, getPostById, getPostsByUser, updatePost, deletePost };