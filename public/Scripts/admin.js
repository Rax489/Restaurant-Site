document.addEventListener('DOMContentLoaded', async() => {
    await displayAllGalleryImages();
    await displayAllServices();
    await displayAllEmployees();
    await populatePositions();
    await displayAllCategories();
    await populateCategoryDropdown();
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
        document.getElementById('result-service').textContent = "Моля попълнете всички полета!";
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
        document.getElementById('result-service').textContent = "";
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

       
        document.getElementById('service-from').reset();
        document.getElementById('result-service').textContent = "";
        displayAllServices();
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
        document.getElementById('result-gallery').textContent = "";
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

        
        document.getElementById('gallery-form').reset();
        document.getElementById('result-gallery').textContent = "";
        displayAllGalleryImages();
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

    if(!workerName || !workerPosition || !workerExperience || !workerImage){
        document.getElementById('result-employee').innerHTML = "Моля попълнете всички полета!";
        return;
    }
    
    const employeeExistence = await checkEmployeeExistence(workerName);
    if(employeeExistence){
        document.getElementById('result-employee').innerHTML = "Работник с това име вече съществува!";
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
        document.getElementById('result-employee').innerHTML = "";
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

    if(!workerId){
        document.getElementById('result-employee').innerHTML = "Моля изберете работник първо!";
        return;
    }else{
        if(!workerName || !workerPosition || !workerExperience || !workerImage){
            document.getElementById('result-employee').innerHTML = "Моля попълнете всички полета!";
            return;
        }
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
        document.getElementById('result-employee').innerHTML = '';
        displayAllEmployees();
    } catch (error) {
        console.error('Error updating employee:', error);
    }
});

async function checkEmployeeExistence(employeeName) {
    try {
        const response = await fetch('http://localhost:3001/api/employees');
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }
        const employees = await response.json();
        const existingEmployee = employees.find(employee => employee.name === employeeName);
        return !!existingEmployee;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function displayAllCategories() {
    try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const categories = await response.json();

        const categoryList = document.querySelector('.category-list ul');

        categoryList.innerHTML = '';

        categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            const itemContent = document.createElement('div');
            itemContent.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'w-100');

            const categoryName = document.createElement('span');
            categoryName.textContent = category.name;

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
                    const deleteResponse = await fetch(`http://localhost:3001/api/categories/${category.id}`, {
                        method: 'DELETE'
                    });
                    if (!deleteResponse.ok) {
                        throw new Error('Failed to delete category');
                    }
                    displayAllCategories();
                } catch (error) {
                    console.error('Error deleting category:', error);
                }
            });
            viewButton.addEventListener('click', () => {
                document.getElementById('categoryName').value = category.name;
                document.getElementById('categoryDescription').value = category.desc;
                const imageUrl = category.imageUrl.replace('public', '..');
                document.getElementById('currentCategoryImage').src = imageUrl;
                document.getElementById('categoryId').value = category.id;
            });

            itemContent.appendChild(categoryName);
            itemContent.appendChild(buttonContainer);
            buttonContainer.appendChild(viewButton);
            buttonContainer.appendChild(deleteButton);
            listItem.appendChild(itemContent);
            categoryList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.getElementById('category-add').addEventListener('click', async (event) => {
    event.preventDefault(); 
    
    const categoryName = document.getElementById('categoryName').value;
    const categoryDescription = document.getElementById('categoryDescription').value;
    const categoryImage = document.getElementById('categoryImage').files[0];
    
    if (!categoryName || !categoryDescription || !categoryImage) {
        document.getElementById('result-category').textContent = "Моля попълнете всички полета!";
        return;
    }

    const existingCategory = await checkCategoryExistence(categoryName);
    if (existingCategory) {
        document.getElementById('categoryName').value = "";
        document.getElementById('result-category').textContent = "Категория с това име вече съществува! Моля, опитайте с друго име.";
        return;
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('desc', categoryDescription);
    formData.append('srcImage', categoryImage);

    try {
        const response = await fetch('http://localhost:3001/api/categories', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to add category');
        }
        document.getElementById('category-form').reset();
        document.getElementById('result-category').textContent = "";
        displayAllCategories();
    } catch (error) {
        console.error('Error adding category:', error);
    }
});

document.getElementById('category-edit').addEventListener('click', async (event) => {
    event.preventDefault();
    
    const categoryId = document.getElementById('categoryId').value;
    const categoryName = document.getElementById('categoryName').value;
    const categoryDescription = document.getElementById('categoryDescription').value;
    const categoryImage = document.getElementById('categoryImage').files[0];

    if (!categoryId) {
        document.getElementById('result-category').textContent = "Моля първо изберете категория!";
        return;
    } else {
        if (!categoryName || !categoryDescription || !categoryImage) {
            document.getElementById('result-category').textContent = "Моля, попълнете име, описание и качете изображение.";
            return;
        }
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('desc', categoryDescription);
    formData.append('srcImage', categoryImage);


    try {
        const response = await fetch(`http://localhost:3001/api/categories/${categoryId}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update category');
        }

        document.getElementById('category-form').reset();
        document.getElementById('result-category').textContent = "";
        displayAllCategories();
    } catch (error) {
        console.error('Error updating category:', error);
    }
});

async function checkCategoryExistence(categoryName) {
    try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const categories = await response.json();
        const existingCategory = categories.find(category => category.name === categoryName);
        return !!existingCategory;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

document.getElementById('categorySelect').addEventListener('change', async () => {
    const categoryElement = document.getElementById('categorySelect');
    const categoryName = categoryElement.options[categoryElement.selectedIndex].textContent;

    try {
        const response = await fetch(`http://localhost:3001/api/dishes`);
        if (!response.ok) {
            throw new Error('Failed to fetch dishes');
        }

        const dishes = await response.json();
        const filteredDishes = dishes.filter(dish => dish.category === categoryName);
        const dishList = document.querySelector('.dish-list ul');

        dishList.innerHTML = '';

        filteredDishes.forEach(dish => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            const dishNameSpan = document.createElement('span');
            dishNameSpan.textContent = dish.name;
        
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
        
            const viewButton = document.createElement('button');
            viewButton.classList.add('btn', 'me-2');
            viewButton.textContent = 'Разгледай';
        
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'delete-btn');
            deleteButton.textContent = 'Изтрий';
        
            viewButton.addEventListener('click', () => {
                document.getElementById('dishName').value = dish.name;
                document.getElementById('dishPrice').value = dish.price;
                document.getElementById('dishDescription').value = dish.description;
                document.getElementById('dishCategory').value = dish.categoryId; // Assuming categoryId is available in the dish object

                // Display the image of the dish
                const imageUrl = dish.imageUrl.replace('public', '..');
                document.getElementById('currentImage').src = imageUrl;

                // Set the dish id as a hidden input value
                document.getElementById('dishId').value = dish.id; // Assuming dish id is available in the dish object
            });

            // Add event listener to "Изтрий" button
            deleteButton.addEventListener('click', async () => {
                try {
                    const deleteResponse = await fetch(`http://localhost:3001/api/dishes/${dish.id}`, {
                        method: 'DELETE'
                    });
                    if (!deleteResponse.ok) {
                        throw new Error('Failed to delete dish');
                    }
                    // If deletion is successful, remove the corresponding list item from the UI
                    listItem.remove();
                } catch (error) {
                    console.error('Error deleting dish:', error);
                }
            });


            buttonContainer.appendChild(viewButton);
            buttonContainer.appendChild(deleteButton);
        
            listItem.appendChild(dishNameSpan);
            listItem.appendChild(buttonContainer);
        
            dishList.appendChild(listItem);
        });
        
    } catch (error) {
        console.error('Error fetching dishes:', error.message);
    }
});




async function populateCategoryDropdown() {
    try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const categories = await response.json();
        const categorySelect = document.getElementById('categorySelect');

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching categories:', error.message);
    }
}

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

