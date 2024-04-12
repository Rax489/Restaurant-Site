
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
                // Fill form inputs with service values
                document.getElementById('serviceName').value = service.name;
                document.getElementById('serviceDescription').value = service.desc;
                const imageUrl = service.imageUrl.replace('public', '..');
                console.log(imageUrl);
                document.getElementById('currentImage').src = imageUrl;

                window.scrollTo(0, 0);
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



document.addEventListener('DOMContentLoaded', displayAllServices());
