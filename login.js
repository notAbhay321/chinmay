document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

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
                const errorMessage = error.message;
                loginMessage.textContent = errorMessage;
                loginMessage.className = 'error';
            });
    });
});