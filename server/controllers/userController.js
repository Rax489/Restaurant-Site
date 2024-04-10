const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../models/userModel');

async function createUserHandler(reqBody) {
    try {
        const newUser = await createUser(reqBody);
        return newUser;
    } catch (error) {
        throw new Error('Error creating user');
    }
}

async function getUsersHandler() {
    try {
        const users = await getUsers();
        return users;
    } catch (error) {
        throw new Error('Error getting users');
    }
}

async function getUserByIdHandler(userId) {
    try {
        const user = await getUserById(userId);
        return user;
    } catch (error) {
        throw new Error('Error getting user by ID');
    }
}

async function updateUserHandler(userId, userData) {
    try {
        const updatedUser = await updateUser(userId, userData);
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user');
    }
}

async function deleteUserHandler(userId) {
    try {
        const deletedUser = await deleteUser(userId);
        return deletedUser;
    } catch (error) {
        throw new Error('Error deleting user');
    }
}

module.exports = {
    createUser: createUserHandler,
    getUsers: getUsersHandler,
    getUserById: getUserByIdHandler,
    updateUser: updateUserHandler,
    deleteUser: deleteUserHandler
};