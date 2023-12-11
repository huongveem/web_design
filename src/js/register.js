document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Your form validation logic here (you can check if the fields are not empty, etc.)

        // Assuming the form is valid, you can simulate a successful registration
        var successMessage = "Registration successful!";
        alert(successMessage);

        // Redirect to index.html after a short delay (you can adjust the delay as needed)
        setTimeout(function () {
            window.location.href = "index.html";
        }, 2000); // 2000 milliseconds (2 seconds) delay
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.querySelector('.back-btn');
    
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
