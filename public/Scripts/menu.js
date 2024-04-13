async function displayMenuCategories() {
    try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch menu categories');
        }

        const categories = await response.json();
        const mainElement = document.querySelector('main');

        categories.forEach((category, index) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row', 'col-md-12');

            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-section');

            const image = document.createElement('img');
            const imageUrl = category.imageUrl.replace('public', '..');
            image.src = imageUrl;
            image.alt = `${category.name} Image`;
            image.classList.add('img-fluid');

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('category-content', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

            const heading = document.createElement('h3');
            heading.classList.add('category-heading');
            heading.textContent = category.name.toUpperCase();

            const description = document.createElement('p');
            description.classList.add('category-description', 'text-center', 'p-3', 'mt-3', 'mb-4');
            description.textContent = category.desc;

            const button = document.createElement('a');
            button.classList.add('btn', 'col-md-5');
            button.textContent = 'РАЗГЛЕДАЙ';

            button.addEventListener('click', () => {
                window.location.href = `category.html?category=${encodeURIComponent(category.name)}`;
            });

            contentDiv.appendChild(heading);
            contentDiv.appendChild(description);
            contentDiv.appendChild(button);

            categoryDiv.appendChild(image);
            categoryDiv.appendChild(contentDiv);

            rowDiv.appendChild(categoryDiv);
            mainElement.appendChild(rowDiv);

            const separator = document.createElement('div');
            if(index < categories.length - 1) {
                separator.classList.add('separator');
                mainElement.appendChild(separator);
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', displayMenuCategories);