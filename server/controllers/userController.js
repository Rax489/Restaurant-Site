const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(userData) {
    try {
        const newUser = await prisma.user.create({
            data: userData,
        });
        return newUser;
    } catch (error) {
        throw new Error('Error creating user');
    }
}

async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        throw new Error('Error getting users');
    }
}

async function getUserById(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        return user;
    } catch (error) {
        throw new Error('Error getting user by ID');
    }
}

async function updateUser(userId, userData) {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(userId),
            },
            data: userData,
        });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user');
    }
}

async function deleteUser(userId) {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: parseInt(userId),
            },
        });
        return deletedUser;
    } catch (error) {
        throw new Error('Error deleting user');
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
