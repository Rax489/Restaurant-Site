import {userService} from '../../db_operations/userService';
const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var passwordValue = document.getElementById("password").value;
    var passwordConfirmValue = document.getElementById("password-confirm").value;

    if (passwordValue !== passwordConfirmValue) {
        document.getElementById("result-register").innerHTML = "Паролите Ви не съвпадат!";
        document.getElementById("password").value = "";
        document.getElementById("password-confirm").value = "";
        return false;
    }
    else {
        window.location.href = "index.html";
        return true;
    }
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