document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = '👁️';
        }
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Clear previous messages
        loginMessage.textContent = '';
        loginMessage.className = '';

        // Basic email validation
        if (!validateEmail(email)) {
            loginMessage.textContent = 'Please enter a valid email address.';
            loginMessage.className = 'error';
            return;
        }

        // Basic password validation
        if (password.length < 6) {
            loginMessage.textContent = 'Password must be at least 6 characters long.';
            loginMessage.className = 'error';
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                loginMessage.textContent = 'Login successful!';
                loginMessage.className = 'success';
                // Redirect to admin page
                window.location.href = 'admin.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/invalid-login-credentials') {
                    loginMessage.textContent = 'Invalid credentials. Please try again.';
                } else {
                    loginMessage.textContent = 'Login failed. Please try again.';
                }
                loginMessage.className = 'error';
            });
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});