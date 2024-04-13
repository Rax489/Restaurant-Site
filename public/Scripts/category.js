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


        

    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', displayMenuCategories);