const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createCategory(categoryData) {
    try {
        const newCategory = await prisma.category.create({
            data: categoryData,
        });
        return newCategory;
    } catch (error) {
        throw new Error('Error creating category');
    }
}

async function getCategories() {
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error) {
        throw new Error('Error getting categories');
    }
}

async function getCategoryById(categoryId) {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(categoryId),
            },
        });
        return category;
    } catch (error) {
        throw new Error('Error getting category by ID');
    }
}

async function updateCategory(categoryId, categoryData) {
    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: parseInt(categoryId),
            },
            data: categoryData,
        });
        return updatedCategory;
    } catch (error) {
        throw new Error('Error updating category');
    }
}

async function deleteCategory(categoryId) {
    try {
        const deletedCategory = await prisma.category.delete({
            where: {
                id: parseInt(categoryId),
            },
        });
        return deletedCategory;
    } catch (error) {
        throw new Error('Error deleting category');
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
