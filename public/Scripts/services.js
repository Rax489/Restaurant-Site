async function displayAllServices() {
    try {
        const response = await fetch('http://localhost:3001/api/services');
        if (!response.ok) {
            throw new Error('Failed to fetch services');
        }

        const services = await response.json();
        const servicesContainer = document.getElementById('services-section');

        services.forEach(service => {
            const section = document.createElement('section');
            section.classList.add('container-fluid', 'mt-5', 'pb-5');

            const container = document.createElement('div');
            container.classList.add('container-fluid', 'd-flex', 'justify-content-center', 'align-items-center', 'm-0', 'p-5');

            const serviceContainer = document.createElement('div');
            serviceContainer.classList.add('services-container', 'd-flex', 'justify-content-center', 'align-items-center', 'col-md-12', 'm-0');

            const leftDiv = document.createElement('div');
            leftDiv.classList.add('services-left', 'col-md-6', 'm-0', 'p-0');
            const leftImg = document.createElement('img');
            const imageUrl = service.imageUrl.replace('public', '..');
            leftImg.src = imageUrl;
            leftImg.alt = 'Service Image';
            leftImg.classList.add('img-fluid');
            leftDiv.appendChild(leftImg);

            const rightDiv = document.createElement('div');
            rightDiv.classList.add('services-right', 'col-md-6', 'm-0', 'p-0');
            const title = document.createElement('h2');
            title.textContent = service.name.toUpperCase();
            const description = document.createElement('p');
            description.classList.add('p-4');
            description.textContent = service.desc;
            const contactLink = document.createElement('a');
            contactLink.href = 'contacts.html';
            contactLink.textContent = 'КОНТАКТИ';
            contactLink.classList.add('btn');
            rightDiv.appendChild(title);
            rightDiv.appendChild(description);
            rightDiv.appendChild(contactLink);

            serviceContainer.appendChild(leftDiv);
            serviceContainer.appendChild(rightDiv);

            container.appendChild(serviceContainer);
            section.appendChild(container);

            servicesContainer.appendChild(section);
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', displayAllServices);