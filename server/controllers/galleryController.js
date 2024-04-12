const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createPhoto(photoData) {
    try {
        const newPhoto = await prisma.gallery.create({
            data: photoData,
        });
        return newPhoto;
    } catch (error) {
        throw new Error('Error creating photo');
    }
}

async function getPhotos() {
    try {
        const photos = await prisma.gallery.findMany();
        return photos;
    } catch (error) {
        throw new Error('Error getting photos');
    }
}

async function getPhotoById(photoId) {
    try {
        const photo = await prisma.gallery.findUnique({
            where: {
                id: parseInt(photoId),
            },
        });
        return photo;
    } catch (error) {
        throw new Error('Error getting photo by ID');
    }
}

async function updatePhoto(photoId, photoData) {
    try {
        const updatedPhoto = await prisma.gallery.update({
            where: {
                id: parseInt(photoId),
            },
            data: photoData,
        });
        return updatedPhoto;
    } catch (error) {
        throw new Error('Error updating photo');
    }
}

async function deletePhoto(photoId) {
    try {
        const deletedPhoto = await prisma.gallery.delete({
            where: {
                id: parseInt(photoId),
            },
        });
        return deletedPhoto;
    } catch (error) {
        throw new Error('Error deleting photo');
    }
}

module.exports = {
    createPhoto,
    getPhotos,
    getPhotoById,
    updatePhoto,
    deletePhoto
};