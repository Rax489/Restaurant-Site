document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async function(event) {
        var valid = true;
        event.preventDefault();

        var email = document.getElementById('email').value;
        var name = document.getElementById('names').value;
        var password = document.getElementById('password').value;
        var cpassword = document.getElementById('password-confirm').value;
        var resultRegister = document.getElementById('result-register');

        const users = await fetchAllUsers();
        users.forEach(element => {
            if(element.name === name){
                valid = false;
                resultRegister.textContent = "Това име е вече заето!";
                document.getElementById('names').value = '';
            }else if(element.email === email){
                valid = false;
                resultRegister.textContent = "Този имейл адрес е вече зает!";
                document.getElementById('email').value='';
            }
        });
        if(password.length < 6) { // Check if password length is less than 6 characters
            valid=false;
            resultRegister.textContent = "Паролата трябва да бъде поне 6 символа";
            document.getElementById('password').value = '';
            document.getElementById('password-confirm').value = '';
        }else if(password !== cpassword){
            valid=false;
            resultRegister.textContent = "Паролите Ви не съвпадат";
            document.getElementById('password').value = '';
            document.getElementById('password-confirm').value = '';
        }
            

        if(valid){
            try {
                const user ={
                    email: email,
                    name: name,
                    password: password
                }
                
                const response = await fetch('http://localhost:3001/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
    
                if (!response.ok) {
                    throw new Error('Failed to register user');
                }
    
                const data = await response.json();
                console.log('User registered successfully:', data);
                window.location.href = "login.html"
            } catch (error) {
                console.error('Error registering user:', error);
                resultRegister.textContent = 'Failed to register user. Please try again later.';
            }
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