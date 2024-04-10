const inputs = document.querySelectorAll('.line-input');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.backgroundColor = '#020640';
    });

    input.addEventListener('blur', function() {
        this.style.backgroundColor = 'transparent'; 
    });
});