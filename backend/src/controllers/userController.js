const { registerUser, loginUser, getUserById, getAllUsers } = require("../services/userService");

const userController = {
    register: async (req, res, next) => {
        const { email, password, firstName, lastName } = req.body;
        try {
            const user = await registerUser(email, password, firstName, lastName);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        const { idToken } = req.body;
        try {
            const user = await loginUser(idToken);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req, res, next) => {
        const { uid } = req.params;
        try {
            const user = await getUserById(uid);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const users = await getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
   
}

module.exports = userController;