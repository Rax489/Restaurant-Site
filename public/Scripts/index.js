document.getElementById('review-button').addEventListener('click', async (event) => {
    event.preventDefault(); 

    const userName = document.getElementById('uname').value;
    const rating = parseInt(document.querySelector('input[name="rating"]:checked').value);
    const description = document.getElementById('msg').value;

    const reviewData = {
        name: userName,
        rating: rating,
        content: description,
        isApproved: false
    };

    try {
        const response = await fetch('http://localhost:3001/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });
        if (!response.ok) {
            throw new Error('Failed to submit review');
        }

        document.getElementById('uname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phoneNum').value = '';
        document.getElementById('msg').value = '';
        document.querySelector('input[name="rating"]:checked').checked = false;
    } catch (error) {
        console.error('Error submitting review:', error);
    }
});

document.getElementById('reservation-button').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("reservation-result").textContent = "УСПЕШНА РЕЗЕРВАЦИЯ!";
});

async function fetchReviews() {
    try {
        const response = await fetch('http://localhost:3001/api/feedback');
        const reviews = await response.json();

        const section = document.querySelector('.review-section');
        section.innerHTML = '';

        reviews.forEach(reviewData => {
            if (reviewData.isApproved) {
                const container = document.createElement('div');
                container.classList.add('container', 'col-md-12');
                const row = document.createElement('div');
                row.classList.add('col-md-6', 'mb-5');
                const col = document.createElement('div');
                const reviewContainer = document.createElement('div');
                reviewContainer.classList.add('review-container', 'p-3');
                const name = document.createElement('h4');
                name.textContent = reviewData.name.toUpperCase();
                const starRating = document.createElement('div');
                starRating.classList.add('star-rating', 'd-flex', 'flex-row-reverse');
                
                for (let i = 5; i >= 1; i--) {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'radio');
                    input.setAttribute('id', `star${i}-${reviewData.id}`);
                    input.setAttribute('name', `rating-${reviewData.id}`);
                    input.setAttribute('value', i);
                    if (i === reviewData.rating) {
                        input.setAttribute('checked', 'checked');
                    }

                    const label = document.createElement('label');
                    label.setAttribute('for', `star${i}-${reviewData.id}`);

                    if (i <= reviewData.rating) {
                        label.style.color = 'gold';
                    } else {
                        label.style.color = 'gray';
                    }

                    starRating.appendChild(input);
                    starRating.appendChild(label);
                }
                
                const description = document.createElement('p');
                description.classList.add('result-description', 'm-0');
                description.textContent = reviewData.content;
                reviewContainer.appendChild(name);
                reviewContainer.appendChild(starRating);
                reviewContainer.appendChild(description);
                col.appendChild(reviewContainer);
                row.appendChild(container);
                container.appendChild(col);
                section.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchReviews();
});