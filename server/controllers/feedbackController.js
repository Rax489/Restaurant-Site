const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createFeedback(feedbackData) {
    try {
        const newFeedback = await prisma.feedback.create({
            data: feedbackData,
        });
        return newFeedback;
    } catch (error) {
        throw new Error('Error creating feedback');
    }
}

async function getFeedbacks() {
    try {
        const feedbacks = await prisma.feedback.findMany();
        return feedbacks;
    } catch (error) {
        throw new Error('Error getting feedbacks');
    }
}

async function getFeedbackById(feedbackId) {
    try {
        const feedback = await prisma.feedback.findUnique({
            where: {
                id: parseInt(feedbackId),
            },
        });
        return feedback;
    } catch (error) {
        throw new Error('Error getting feedback by ID');
    }
}

async function updateFeedback(feedbackId, feedbackData) {
    try {
        const updatedFeedback = await prisma.feedback.update({
            where: {
                id: parseInt(feedbackId),
            },
            data: feedbackData,
        });
        return updatedFeedback;
    } catch (error) {
        throw new Error('Error updating feedback');
    }
}

async function deleteFeedback(feedbackId) {
    try {
        const deletedFeedback = await prisma.feedback.delete({
            where: {
                id: parseInt(feedbackId),
            },
        });
        return deletedFeedback;
    } catch (error) {
        throw new Error('Error deleting feedback');
    }
}

module.exports = {
    createFeedback,
    getFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
};