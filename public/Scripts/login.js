document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var resultLogin = document.getElementById('result-login');

        try {
            const users = await fetchAllUsers();
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                const user = users.find(user => user.email === email);
                
                if (user.password === password) {
                    console.log('User logged in successfully:', user);
                        const loggedUser = {
                            name:user.name,
                            email:user.email
                        };

                    const sessionResponse = await fetch('http://localhost:3001/api/sessions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                });
                if (!sessionResponse.ok) {
                    throw new Error('Failed to create session');
                }
                console.log('Session created successfully');
                    window.location.href = "index.html";
                } else {
                    throw new Error('Грешна парола!');
                }
            } else {
                throw new Error('Този имейл не е регистриран!');
            }
        } catch (error) {
            if (error.message === 'Този имейл не е регистриран!') {
                document.getElementById('email').value = '';
            } else {
                document.getElementById('password').value = '';
            }
            resultLogin.textContent = error.message;
        }
    });
});

async function fetchAllUsers() {
    try {
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

const inputs = document.querySelectorAll('.line-input');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.backgroundColor = '#020640';
    });

    input.addEventListener('blur', function() {
        this.style.backgroundColor = 'transparent'; 
    });
});
