const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('category');
const title = document.getElementById('category-menu');
title.textContent = categoryName.toUpperCase();

async function displayMenuCategories() {
    try {
        const response = await fetch('http://localhost:3001/api/dishes');
        if (!response.ok) {
            throw new Error('Failed to fetch dishes');
        }

        const dishes = await response.json();
        const filteredDishes = dishes.filter(dish => dish.category === categoryName);

        const menuSection = document.getElementById('restaurant-menu');

        let dishCount = 0;
        let row;

        filteredDishes.forEach(dish => {
            if (dishCount % 3 === 0) {
                row = document.createElement('div');
                row.classList.add('row');
                menuSection.appendChild(row);
            }

            const dishColumn = document.createElement('div');
            dishColumn.classList.add('col-md-4', 'col-sm-6', 'mb-5', 'm-0');

            const dishCard = document.createElement('div');
            dishCard.classList.add('single-dish');

            const listGroup = document.createElement('ul');
            listGroup.classList.add('list-group');

            const listItem1 = document.createElement('li');
            listItem1.classList.add('list-group-item');
            const image = document.createElement('img');
            const imageUrl = dish.imageUrl.replace('public', '..');
            image.src = imageUrl;
            image.alt = dish.name;
            image.classList.add('img-thumbnail');
            listItem1.appendChild(image);

            const listItem2 = document.createElement('li');
            listItem2.classList.add('list-group-item');
            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = dish.name.toUpperCase();
            listItem2.appendChild(title);

            const listItem3 = document.createElement('li');
            listItem3.classList.add('list-group-item');
            const description = document.createElement('p');
            description.classList.add('card-text');
            description.textContent = dish.desc;
            listItem3.appendChild(description);

            const listItem4 = document.createElement('li');
            listItem4.classList.add('list-group-item');
            const price = document.createElement('p');
            price.classList.add('card-text');
            price.innerHTML = `<a>ЦЕНА</a><a>${dish.price} лв</a>`;
            listItem4.appendChild(price);

            listGroup.appendChild(listItem1);
            listGroup.appendChild(listItem2);
            listGroup.appendChild(listItem3);
            listGroup.appendChild(listItem4);

            dishCard.appendChild(listGroup);
            dishColumn.appendChild(dishCard);
            row.appendChild(dishColumn);

            dishCount++;
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', displayMenuCategories);