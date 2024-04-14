document.addEventListener('DOMContentLoaded', async() => {
    await displayAllGalleryImages();
    await displayAllServices();
    await displayAllEmployees();
    await populatePositions();
    await displayAllCategories();
    await displayAllDishes();
    await displayFeedback()
    await populateCategoryDropdown('categorySelect');
    await populateCategoryDropdown('dishCategory');
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
        document.getElementById('currentImage').src = '../Images/services1.png';
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
        document.getElementById('imageName').value = '';
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
        document.getElementById('currentImageGallery').src='../Images/galleryAdmin.png';
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
        document.getElementById('workerName').value = '';
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
        document.getElementById('currentImageEmployee').src='../Images/cook1.png';
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
        document.getElementById('currentCategoryImage').src = '../Images/desserts.png';
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

async function displayAllDishes(){
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
                    document.getElementById('dishDescription').value = dish.desc;
                
                    const imageUrl = dish.imageUrl.replace('public', '..');
                    document.getElementById('currentDishImage').src = imageUrl;
                    console.log(imageUrl)
                
                    document.getElementById('dishId').value = dish.id;
                
                    const dishCategorySelect = document.getElementById('dishCategory');
                    
                    const matchingOption = [...dishCategorySelect.options].find(option => option.textContent === categoryName);
                    
                    if (matchingOption) {
                        dishCategorySelect.value = matchingOption.value;
                    }
                });
                
    
                deleteButton.addEventListener('click', async () => {
                    try {
                        const deleteResponse = await fetch(`http://localhost:3001/api/dishes/${dish.id}`, {
                            method: 'DELETE'
                        });
                        if (!deleteResponse.ok) {
                            throw new Error('Failed to delete dish');
                        }
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
}

document.getElementById('dish-add').addEventListener('click', async (event) => {
    event.preventDefault(); 
    
    const dishName = document.getElementById('dishName').value;
    const dishPrice = document.getElementById('dishPrice').value;
    const categoryElement = document.getElementById('dishCategory');
    const dishCategory = categoryElement.options[categoryElement.selectedIndex].textContent;
    const dishDescription = document.getElementById('dishDescription').value;
    const dishImage = document.getElementById('dishImage').files[0];

    const dishExistance = await checkDishExistence(dishName);
    console.log(dishExistance);
    if(dishExistance){
        document.getElementById('dishName').value = '';
        document.getElementById('result-dish').innerHTML = "Ястие с това име вече същестува!";
        return;
    }
    if (!dishName || !dishPrice || !dishCategory || !dishDescription || !dishImage) {
        document.getElementById('result-dish').innerHTML = "Моля попълнете всички полета!";
        return;
    }

    const formData = new FormData();
    formData.append('name', dishName);
    formData.append('category', dishCategory);
    formData.append('price', dishPrice);
    formData.append('desc', dishDescription);
    formData.append('srcImage', dishImage);

    try {
        const response = await fetch('http://localhost:3001/api/dishes', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to add dish');
        }
        document.getElementById('dish-form').reset();
        document.getElementById('result-dish').innerHTML = "";
        displayAllDishes();
    } catch (error) {
        console.error('Error adding dish:', error);
    }
});

document.getElementById('dish-edit').addEventListener('click', async (event) => {
    event.preventDefault();
    
    const dishId = document.getElementById('dishId').value;
    const dishName = document.getElementById('dishName').value;
    const dishPrice = document.getElementById('dishPrice').value;
    const categoryElement = document.getElementById('dishCategory');
    const dishCategory = categoryElement.options[categoryElement.selectedIndex].textContent;
    const dishDescription = document.getElementById('dishDescription').value;
    const dishImage = document.getElementById('dishImage').files[0];

    if (!dishId) {
        document.getElementById('result-dish').innerHTML = "Моля първо изберете ястие!";
        return;
    } else {
        if (!dishName || !dishPrice || !dishCategory || !dishDescription || !dishImage) {
            document.getElementById('result-dish').innerHTML = "Моля попълнете всички полета!";
            return;
        }
    }

    const formData = new FormData();
    formData.append('name', dishName);
    formData.append('category', dishCategory);
    formData.append('price', dishPrice);
    formData.append('desc', dishDescription);
    formData.append('srcImage', dishImage);

    try {
        const response = await fetch(`http://localhost:3001/api/dishes/${dishId}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to update dish');
        }
        document.getElementById('dish-form').reset();
        document.getElementById('currentDishImage').src = '../Images/salad.png';
        document.getElementById('result-dish').innerHTML = '';
        displayAllDishes();
    } catch (error) {
        console.error('Error updating dish:', error);
    }
});

async function checkDishExistence(dishName) {
    try {
        const response = await fetch('http://localhost:3001/api/dishes');
        if (!response.ok) {
            throw new Error('Failed to fetch dishes');
        }
        const dishes = await response.json();
        const existingDish = dishes.find(dish => dish.name === dishName);
        return !!existingDish;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function displayFeedback() {
    try {
        const response = await fetch('http://localhost:3001/api/feedback');
        if (!response.ok) {
            throw new Error('Failed to fetch feedback');
        }

        const feedbackData = await response.json();

        const feedbackList = document.querySelector('.feedback-list ul');

        feedbackData.forEach(feedback => {
            if(feedback.isApproved === false) {
                const feedbackItem = document.createElement('li');
                feedbackItem.classList.add('feedback-item');

                const rowDiv = document.createElement('div');
                rowDiv.classList.add('row', 'mb-5');

                const col10Div = document.createElement('div');
                col10Div.classList.add('col-md-10');

                const feedbackContentDiv = document.createElement('div');
                feedbackContentDiv.classList.add('feedback-content');

                const namePara = document.createElement('p');
                namePara.innerHTML = `<strong>Име:</strong> ${feedback.name}`;

                const starsPara = document.createElement('p');
                starsPara.innerHTML = `<strong>Звезди:</strong> ${feedback.rating}`;

                const reviewPara = document.createElement('p');
                reviewPara.innerHTML = `<strong>Отзив:</strong> ${feedback.content}`;

                feedbackContentDiv.appendChild(namePara);
                feedbackContentDiv.appendChild(starsPara);
                feedbackContentDiv.appendChild(reviewPara);
                col10Div.appendChild(feedbackContentDiv);
                rowDiv.appendChild(col10Div);

                const col2Div = document.createElement('div');
                col2Div.classList.add('col-md-2');

                const buttonContainerDiv = document.createElement('div');
                buttonContainerDiv.classList.add('button-container');

                const approveColDiv = document.createElement('div');
                approveColDiv.classList.add('col', 'text-center', 'add-btn');

                const approveButton = document.createElement('button');
                approveButton.classList.add('btn');
                approveButton.textContent = 'ОДОБРИ';

                approveButton.addEventListener('click', async () => {
                    try {
                        const response = await fetch(`http://localhost:3001/api/feedback/${feedback.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                isApproved: true
                            })
                        });

                        if (!response.ok) {
                            throw new Error('Failed to approve feedback');
                        }

                        feedbackList.removeChild(feedbackItem);

                        console.log('Feedback approved successfully');
                    } catch (error) {
                        console.error('Error approving feedback:', error.message);
                    }
                });
                
                approveColDiv.appendChild(approveButton);

                const deleteColDiv = document.createElement('div');
                deleteColDiv.classList.add('col', 'text-center', 'delete-btn', 'mt-3');

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('btn');
                deleteButton.textContent = 'ИЗТРИЙ';

                deleteButton.addEventListener('click', async () => {
                    try {
                        const response = await fetch(`http://localhost:3001/api/feedback/${feedback.id}`, {
                            method: 'DELETE'
                        });
                
                        if (!response.ok) {
                            throw new Error('Failed to delete feedback');
                        }
                
                        console.log('Feedback deleted successfully');
                        feedbackList.removeChild(feedbackItem);
                    } catch (error) {
                        console.error('Error deleting feedback:', error.message);
                    }
                });

                deleteColDiv.appendChild(deleteButton);

                buttonContainerDiv.appendChild(approveColDiv);
                buttonContainerDiv.appendChild(deleteColDiv);
                col2Div.appendChild(buttonContainerDiv);
                rowDiv.appendChild(col2Div);

                feedbackItem.appendChild(rowDiv);
                feedbackList.appendChild(feedbackItem);
            }    
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function populateCategoryDropdown(selectId) {
    try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const categories = await response.json();
        const selectElement = document.getElementById(selectId);

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error(`Error fetching categories for ${selectId}:`, error.message);
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
