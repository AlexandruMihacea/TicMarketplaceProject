const { createPost, getAllPosts, getPostById, getPostsByUser, updatePost, deletePost } = require("../services/postService");
const {uploadImage} = require("../services/uploadImages");

const postController = {

    create: async (req, res, next) => {
        try {
            const { title, description, price, userId } = req.body;
            let imageUrl = null;

            if (req.file) {
                imageUrl = await uploadImage(req.file); 
            }

            const post = await createPost(title, description, price, userId, imageUrl);
            res.status(201).json(post);
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const posts = await getAllPosts();
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        const { postId } = req.params;
        try {
            const post = await getPostById(postId);
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    },

    getByUser: async (req, res, next) => {
        const { userId } = req.params;
        try {
            const posts = await getPostsByUser(userId);
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        const { postId } = req.params;
        const updates = req.body;

        try {
            const result = await updatePost(postId, updates);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        const { postId } = req.params;

        try {
            const result = await deletePost(postId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = postController;