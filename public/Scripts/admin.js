document.addEventListener('DOMContentLoaded', async() => {
    await displayAllGalleryImages();
    await displayAllServices();
    await displayAllEmployees();
    await populatePositions();
});

async function displayAllServices() {
    try {
        const response = await fetch('http://localhost:3001/api/services');
        if (!response.ok) {
            throw new Error('Failed to fetch services');
        }

        const services = await response.json();

        const serviceList = document.querySelector('.service-list ul');

        serviceList.innerHTML = '';

        services.forEach(service => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            const itemContent = document.createElement('div');
            itemContent.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'w-100');

            const serviceName = document.createElement('span');
            serviceName.textContent = service.name;

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const viewButton = document.createElement('button');
            viewButton.classList.add('btn', 'me-2');
            viewButton.textContent = 'Разгледай';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'delete-btn');
            deleteButton.textContent = 'Изтрий';

            deleteButton.addEventListener('click', async () => {
                try {
                    const deleteResponse = await fetch(`http://localhost:3001/api/services/${service.id}`, {
                        method: 'DELETE'
                    });
                    if (!deleteResponse.ok) {
                        throw new Error('Failed to delete service');
                    }
                    displayAllServices();
                } catch (error) {
                    console.error('Error deleting service:', error);
                }
            });
            viewButton.addEventListener('click', () => {
                document.getElementById('serviceName').value = service.name;
                document.getElementById('serviceDescription').value = service.desc;
                const imageUrl = service.imageUrl.replace('public', '..');
                document.getElementById('currentImage').src = imageUrl;
                document.getElementById('serviceId').value = service.id;
            });

            itemContent.appendChild(serviceName);
            itemContent.appendChild(buttonContainer);
            buttonContainer.appendChild(viewButton);
            buttonContainer.appendChild(deleteButton);
            listItem.appendChild(itemContent);
            serviceList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.getElementById('service-add').addEventListener('click', async (event) => {
    event.preventDefault(); 
    
    const serviceName = document.getElementById('serviceName').value;
    const serviceDescription = document.getElementById('serviceDescription').value;
    const serviceImage = document.getElementById('serviceImage').files[0];
    
    if (!serviceName ||!serviceDescription || !serviceImage) {
        document.getElementById('result-service').textContent = "Моля, попълнете име, описание и качете изображение.";
        return;
    }

    const existingService = await checkServiceExistence(serviceName);
    if (existingService) {
        document.getElementById('serviceName').value = "";
      document.getElementById('result-service').textContent = "Услуга с това име вече съществува! Моля опитайте с друго име."
      return;
    }

    const formData = new FormData();
    formData.append('name', serviceName);
    formData.append('desc', serviceDescription);
    formData.append('srcImage', serviceImage);

    try {
        const response = await fetch('http://localhost:3001/api/services', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to add service');
        }
        document.getElementById('service-from').reset();
        displayAllServices();
    } catch (error) {
        console.error('Error adding service:', error);
    }
});

document.getElementById('service-edit').addEventListener('click', async (event) => {
    event.preventDefault();
    
    const serviceId = document.getElementById('serviceId').value;
    const serviceName = document.getElementById('serviceName').value;
    const serviceDescription = document.getElementById('serviceDescription').value;
    const serviceImage = document.getElementById('serviceImage').files[0];

    if (!serviceName ||!serviceDescription || !serviceImage) {
        document.getElementById('result-service').textContent = "Моля, попълнете име, описание и качете изображение.";
        return;
    }

    if (!serviceId) {
        document.getElementById('result-service').textContent = "Моля първо изберете услуга!";
        return;
    }

    const formData = new FormData();
    formData.append('name', serviceName);
    formData.append('desc', serviceDescription);
    formData.append('srcImage', serviceImage);


    try {
        const response = await fetch(`http://localhost:3001/api/services/${serviceId}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update service');
        }

        displayAllServices();
        document.getElementById('service-from').reset();
    } catch (error) {
        console.error('Error updating service:', error);
    }
});

async function checkServiceExistence(serviceName) {
    try {
        const response = await fetch('http://localhost:3001/api/services');
        if (!response.ok) {
            throw new Error('Failed to fetch services');
        }
        const services = await response.json();
        const existingService = services.find(service => service.name === serviceName);
        return !!existingService;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function displayAllGalleryImages() {
    try {
        const response = await fetch('http://localhost:3001/api/gallery');
        if (!response.ok) {
            throw new Error('Failed to fetch gallery images');
        }

        const galleryImages = await response.json();

        const galleryList = document.querySelector('.gallery-list ul');

        galleryList.innerHTML = '';

        galleryImages.forEach(image => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            const itemName = document.createElement('span');
            itemName.textContent = image.name;

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const viewButton = document.createElement('button');
            viewButton.classList.add('btn', 'me-2');
            viewButton.textContent = 'Разгледай';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'delete-btn');
            deleteButton.textContent = 'Изтрий';

            deleteButton.addEventListener('click', async () => {
                try {
                    const deleteResponse = await fetch(`http://localhost:3001/api/gallery/${image.id}`, {
                        method: 'DELETE'
                    });
                    if (!deleteResponse.ok) {
                        throw new Error('Failed to delete gallery image');
                    }
                    displayAllGalleryImages();
                } catch (error) {
                    console.error('Error deleting gallery image:', error);
                }
            });

            viewButton.addEventListener('click', () => {
                console.log("previwing")
                document.getElementById('imageName').value = image.name;
                document.getElementById('galleryImageId').value = image.id;
                const imageUrl = image.imageUrl.replace('public', '..');
                document.getElementById('currentImageGallery').src = imageUrl;
            });

            listItem.appendChild(itemName);
            listItem.appendChild(buttonContainer);
            buttonContainer.appendChild(viewButton);
            buttonContainer.appendChild(deleteButton);
            galleryList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.getElementById('gallery-add').addEventListener('click', async (event) => {
    event.preventDefault(); 
    
    const imageName = document.getElementById('imageName').value;
    const imageFile = document.getElementById('newImage').files[0];

    if (!imageName || !imageFile) {
        document.getElementById('result-gallery').textContent = "Моля, попълнете име и качете изображение.";
        return;
    }

    const existingGalleryImage = await checkGalleryImageExistence(imageName);
    if (existingGalleryImage) {
        document.getElementById('imageName').value = "";
      document.getElementById('result-gallery').textContent = "Снимка с това име вече съществува! Моля опитайте с друго име."
      return;
    }

    const formData = new FormData();
    formData.append('name', imageName);
    formData.append('srcImage', imageFile);

    try {
        const response = await fetch('http://localhost:3001/api/gallery', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to add gallery image');
        }
        document.getElementById('gallery-form').reset();
        displayAllGalleryImages();
    } catch (error) {
        console.error('Error adding gallery image:', error);
    }
});

document.getElementById('gallery-edit').addEventListener('click', async (event) => {
    event.preventDefault();
    
    const galleryImageId = document.getElementById('galleryImageId').value;
    const imageName = document.getElementById('imageName').value;
    const newImage = document.getElementById('newImage').files[0];

    if (!imageName || !imageFile) {
        document.getElementById('result-gallery').textContent = "Моля, попълнете име и качете изображение.";
        return;
    }

    if (!galleryImageId) {
        document.getElementById('result-gallery').textContent = "Моля първо изберете изображение от галерията!";
        return;
    }

    const formData = new FormData();
    formData.append('name', imageName);
    formData.append('srcImage', newImage);

    try {
        const response = await fetch(`http://localhost:3001/api/gallery/${galleryImageId}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update gallery image');
        }

        displayAllGalleryImages();
        document.getElementById('gallery-form').reset();
    } catch (error) {
        console.error('Error updating gallery image:', error);
    }
});


async function checkGalleryImageExistence(imageName) {
    try {
        const response = await fetch('http://localhost:3001/api/gallery');
        if (!response.ok) {
            throw new Error('Failed to fetch gallery images');
        }
        const galleryImages = await response.json();
        const existingImage = galleryImages.find(image => image.name === imageName);
        return !!existingImage;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function displayAllEmployees() {
    try {
        const response = await fetch('http://localhost:3001/api/employees');
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }

        const employees = await response.json();

        const workerList = document.querySelector('.worker-list ul');

        workerList.innerHTML = '';

        employees.forEach(employee => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            const workerName = document.createElement('span');
            workerName.textContent = employee.name;

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const viewButton = document.createElement('button');
            viewButton.classList.add('btn', 'me-2');
            viewButton.textContent = 'Разгледай';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'delete-btn');
            deleteButton.textContent = 'Изтрий';

            deleteButton.addEventListener('click', async () => {
                try {
                    const deleteResponse = await fetch(`http://localhost:3001/api/employees/${employee.id}`, {
                        method: 'DELETE'
                    });
                    if (!deleteResponse.ok) {
                        throw new Error('Failed to delete employee');
                    }
                    displayAllEmployees();
                } catch (error) {
                    console.error('Error deleting employee:', error);
                }
            });

            viewButton.addEventListener('click', () => {
                document.getElementById('workerName').value = employee.name;
                const positionSelect = document.getElementById('workerPosition');
                for (let i = 0; i < positionSelect.options.length; i++) {
                    if (positionSelect.options[i].textContent === employee.position) {
                        positionSelect.selectedIndex = i;
                        break;
                    }
                }
                document.getElementById('workerExperience').value = employee.exp; // Assuming 'exp' is the property name for experience
                const imageUrl = employee.imageUrl.replace('public', '..');
                document.getElementById('currentImageEmployee').src = imageUrl;
                document.getElementById('workerId').value = employee.id;
            });           

            listItem.appendChild(workerName);
            listItem.appendChild(buttonContainer);
            buttonContainer.appendChild(viewButton);
            buttonContainer.appendChild(deleteButton);
            workerList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}


document.getElementById('worker-add').addEventListener('click', async (event) => {
    event.preventDefault(); 
    
    const workerName = document.getElementById('workerName').value;
    const workerPositionElement = document.getElementById('workerPosition');
    const workerPosition = workerPositionElement.options[workerPositionElement.selectedIndex].textContent;

    const workerExperience = document.getElementById('workerExperience').value;
    const workerImage = document.getElementById('workerImage').files[0];

    if (!workerName || !workerImage) {
        alert('Please provide name and select an image.');
        return;
    }

    const formData = new FormData();
    formData.append('name', workerName);
    formData.append('position', workerPosition);
    formData.append('exp', workerExperience);
    formData.append('srcImage', workerImage);

    try {
        const response = await fetch('http://localhost:3001/api/employees', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to add employee');
        }
        document.getElementById('worker-form').reset();
        displayAllEmployees();
    } catch (error) {
        console.error('Error adding employee:', error);
    }
});

document.getElementById('worker-edit').addEventListener('click', async (event) => {
    event.preventDefault();
    
    const workerId = document.getElementById('workerId').value;
    const workerName = document.getElementById('workerName').value;
    const workerPositionElement = document.getElementById('workerPosition');
    const workerPosition = workerPositionElement.options[workerPositionElement.selectedIndex].textContent;
    const workerExperience = document.getElementById('workerExperience').value;
    const workerImage = document.getElementById('workerImage').files[0];

    if (!workerId || !workerName || !workerImage) {
        alert('Please select an employee and provide name and image.');
        return;
    }

    const formData = new FormData();
    formData.append('name', workerName);
    formData.append('position', workerPosition);
    formData.append('exp', workerExperience);
    formData.append('srcImage', workerImage);

    try {
        const response = await fetch(`http://localhost:3001/api/employees/${workerId}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to update employee');
        }
        document.getElementById('worker-form').reset();
        displayAllEmployees();
    } catch (error) {
        console.error('Error updating employee:', error);
    }
});

async function populatePositions() {
    try {
        const response = await fetch('http://localhost:3001/api/positions');
        if (!response.ok) {
            throw new Error('Failed to fetch positions');
        }

        const positions = await response.json();

        const positionDropdown = document.getElementById('workerPosition');

        positions.forEach(position => {
            const option = document.createElement('option');
            option.value = position.id;
            option.textContent = position.name;
            positionDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching positions:', error.message);
    }
}

