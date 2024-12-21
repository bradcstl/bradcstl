function submitNewsletter() {
    // Get input fields and error message element
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const emailAddress = document.getElementById('emailAddress');
    const errorMessage = document.getElementById('error-message');

    // Simple validation check
    let isValid = true;
    [firstName, lastName, emailAddress].forEach(input => {
        if (!input.value) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    // Check for valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailAddress.value)) {
        emailAddress.classList.add('error');
        isValid = false;
    }

    if (isValid) {
        errorMessage.classList.remove('active');
        alert('Thank you for signing up!'); // Placeholder for actual submission logic
        firstName.value = '';
        lastName.value = '';
        emailAddress.value = '';
    } else {
        errorMessage.classList.add('active');
    }
}