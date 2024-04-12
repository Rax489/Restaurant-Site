const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createService(serviceData) {
    try {
        const newService = await prisma.service.create({
            data: serviceData,
        });
        return newService;
    } catch (error) {
        throw new Error('Error creating service');
    }
}

async function getServices() {
    try {
        const services = await prisma.service.findMany();
        return services;
    } catch (error) {
        throw new Error('Error getting services');
    }
}

async function getServiceById(serviceId) {
    try {
        const service = await prisma.service.findUnique({
            where: {
                id: parseInt(serviceId),
            },
        });
        return service;
    } catch (error) {
        throw new Error('Error getting service by ID');
    }
}

async function updateService(serviceId, serviceData) {
    try {
        const updatedService = await prisma.service.update({
            where: {
                id: parseInt(serviceId),
            },
            data: serviceData,
        });
        return updatedService;
    } catch (error) {
        throw new Error('Error updating service');
    }
}

async function deleteService(serviceId) {
    try {
        const deletedService = await prisma.service.delete({
            where: {
                id: parseInt(serviceId),
            },
        });
        return deletedService;
    } catch (error) {
        throw new Error('Error deleting service');
    }
}

module.exports = {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
};
