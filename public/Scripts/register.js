document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Collect form data
        const formData = {
            id: 1,
            email: document.getElementById('email').value,
            name: document.getElementById('names').value,
            password: document.getElementById('password').value
        };

        // Send data to server
        try {
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const data = await response.json();
            console.log('User registered successfully:', data);
        } catch (error) {
            console.error('Error registering user:', error);
            const resultRegister = document.getElementById('result-register');
            resultRegister.textContent = 'Failed to register user. Please try again later.';
        }
    });
});


const inputs = document.querySelectorAll('.line-input');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.backgroundColor = '#020640';
    });

    input.addEventListener('blur', function() {
        this.style.backgroundColor = 'transparent'; 
    });
});