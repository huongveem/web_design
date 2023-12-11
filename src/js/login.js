"use strict";

document.addEventListener('DOMContentLoaded', function () {
    // Login validation
    const loginForm = document.getElementById('forms');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the form from submitting normally

        const usernameInput = document.getElementById('log-login').value;
        const passwordInput = document.getElementById('log-password').value;

        // Check if the provided credentials are correct (you can replace this with your actual authentication logic)
        if (usernameInput === 'admin' && passwordInput === 'admin') {
            alert('Login successful!'); // You can replace this with your preferred way of displaying a success message
            window.location.href = 'index.html'; // Redirect to the desired page
        } else {
            alert('Invalid username or password. Please try again.'); // You can replace this with your preferred way of displaying an error message
        }
    });

    // Register validation
    const inputLogin = document.getElementById('log-login');
    const inputPsw = document.getElementById('log-password');
    let invalid = document.querySelector('.invalid');

    function isValidLogin() {
        validationStyles();
        // Check for login length
        if (inputLogin.value == '') {
            invalid.textContent = 'Login cannot be empty! Try again';
        } else if (inputLogin.value.length < 6) {
            invalid.textContent = `Login should be at least 6 characters. Now it's: ${inputLogin.value.length}`;
        } else {
            invalid.textContent = '';
            invalid.style.padding = '0';
        }
    }

    function isValidPassword() {
        validationStyles();
        if (inputPsw.value == '') {
            invalid.textContent = 'Password cannot be empty! Try again';
        } else if (inputPsw.value.length < 6) {
            invalid.textContent = `Password should be at least 6 characters. Now it's: ${inputPsw.value.length}`;
        } else {
            invalid.textContent = '';
            invalid.style.padding = '0';
        }
    }

    function validationStyles() {
        if (isValidLogin || isValidPassword) {
            invalid.style.fontSize = '12px';
            invalid.style.maxWidth = '200px';
            invalid.style.padding = '12px 24px';
        }
    }

    inputLogin.addEventListener('blur', isValidLogin);
    inputPsw.addEventListener('blur', isValidPassword);
});
document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.querySelector('.back-btn');
    
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});

