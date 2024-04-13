const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createPosition(positionData) {
    try {
        const newPosition = await prisma.position.create({
            data: positionData,
        });
        return newPosition;
    } catch (error) {
        throw new Error('Error creating position');
    }
}

async function getCategories() {
    try {
        const categories = await prisma.position.findMany();
        return categories;
    } catch (error) {
        throw new Error('Error getting categories');
    }
}

async function getPositionById(positionId) {
    try {
        const position = await prisma.position.findUnique({
            where: {
                id: parseInt(positionId),
            },
        });
        return position;
    } catch (error) {
        throw new Error('Error getting position by ID');
    }
}

async function updatePosition(positionId, positionData) {
    try {
        const updatedPosition = await prisma.position.update({
            where: {
                id: parseInt(positionId),
            },
            data: positionData,
        });
        return updatedPosition;
    } catch (error) {
        throw new Error('Error updating position');
    }
}

async function deletePosition(positionId) {
    try {
        const deletedPosition = await prisma.position.delete({
            where: {
                id: parseInt(positionId),
            },
        });
        return deletedPosition;
    } catch (error) {
        throw new Error('Error deleting position');
    }
}

module.exports = {
    createPosition,
    getCategories,
    getPositionById,
    updatePosition,
    deletePosition
};
