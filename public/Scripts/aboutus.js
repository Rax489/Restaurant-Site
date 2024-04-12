async function displayAllPhotos() {
    try {
        const response = await fetch('http://localhost:3001/api/gallery');
        if (!response.ok) {
            throw new Error('Failed to fetch gallery');
        }

        const photos = await response.json();
        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');

        photos.forEach((photo, index) => {
            const newPhoto = document.createElement('div');
            newPhoto.classList.add('carousel-item');

            if (index === 0) {
                newPhoto.classList.add('active');
            }

            const img = document.createElement('img');
            const imageUrl = photo.imageUrl.replace('public', '..');
            img.src = imageUrl;
            img.alt = 'RestaurantPhoto';

            newPhoto.appendChild(img);
            carouselInner.appendChild(newPhoto);

            const indicator = document.createElement('button');
            indicator.setAttribute('type', 'button');
            indicator.setAttribute('data-bs-target', '#photosCarousel');
            indicator.setAttribute('data-bs-slide-to', index.toString());

            if (index === 0) {
                indicator.classList.add('active');
            }

            carouselIndicators.appendChild(indicator);
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', displayAllPhotos);