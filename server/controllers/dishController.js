const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createDish(dishData) {
    try {
        const newDish = await prisma.dish.create({
            data: dishData,
        });
        return newDish;
    } catch (error) {
        throw new Error('Error creating dish');
    }
}

async function getDishes() {
    try {
        const dishes = await prisma.dish.findMany();
        return dishes;
    } catch (error) {
        throw new Error('Error getting dishes');
    }
}

async function getDishById(dishId) {
    try {
        const dish = await prisma.dish.findUnique({
            where: {
                id: parseInt(dishId),
            },
        });
        return dish;
    } catch (error) {
        throw new Error('Error getting dish by ID');
    }
}

async function updateDish(dishId, dishData) {
    try {
        const updatedDish = await prisma.dish.update({
            where: {
                id: parseInt(dishId),
            },
            data: dishData,
        });
        return updatedDish;
    } catch (error) {
        throw new Error('Error updating dish');
    }
}

async function deleteDish(dishId) {
    try {
        const deletedDish = await prisma.dish.delete({
            where: {
                id: parseInt(dishId),
            },
        });
        return deletedDish;
    } catch (error) {
        throw new Error('Error deleting dish');
    }
}

module.exports = {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    deleteDish
};
