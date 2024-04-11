document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        var email = document.getElementById('email').value;
        var name = document.getElementById('names').value;
        var password = document.getElementById('password').value;
        var cpassword = document.getElementById('password-confirm').value;
        var resultRegister = document.getElementById('result-register');


        if(password === cpassword){
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
        }else{
            resultRegister.textContent = "Паролите Ви не съвпадат";
            document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
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