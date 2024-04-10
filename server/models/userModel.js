const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(data) {
    try {
        const newUser = await prisma.user.create({ data });
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

async function getUserById(id) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    } catch (error) {
        throw new Error('Error getting user by ID');
    }
}

async function updateUser(id, data) {
    try {
        const updatedUser = await prisma.user.update({ where: { id }, data });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user');
    }
}

async function deleteUser(id) {
    try {
        const deletedUser = await prisma.user.delete({ where: { id } });
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