// admin.js
document.addEventListener('DOMContentLoaded', function() {
    const websiteReplica = document.getElementById('website-replica');
    const saveBtn = document.getElementById('save-btn');
    const exitBtn = document.getElementById('exit-btn');
    const clearBtn = document.getElementById('clear-btn');
    const logoutBtn = document.getElementById('logout-btn');

    let editableElements = [];

    // Check if user is logged in
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = 'login.html';
        } else {
            loadWebsiteReplica();
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', async () => {
        try {
            await auth.signOut();
            window.location.href = 'login.html';
        } catch (error) {
            console.error(error);
        }
    });

    // Load website replica
    function loadWebsiteReplica() {
        // Fetch and display the website replica
        // This is a placeholder for the actual website content
        websiteReplica.innerHTML = `
            <h2 contenteditable="true">Welcome to Dr. Chinmay's Homeopathy Clinic</h2>
            <p contenteditable="true">This is a paragraph that you can edit.</p>
            <ul>
                <li contenteditable="true">Editable list item 1</li>
                <li contenteditable="true">Editable list item 2</li>
            </ul>
        `;

        // Collect all editable elements
        editableElements = Array.from(websiteReplica.querySelectorAll('[contenteditable="true"]'));
    }

    // Save functionality
    saveBtn.addEventListener('click', async () => {
        const content = {};
        editableElements.forEach(element => {
            content[element.tagName] = element.innerText;
        });

        try {
            await firestore.collection('websiteContent').doc('current').set(content);
            alert('Content saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to save content.');
        }
    });

    // Exit functionality
    exitBtn.addEventListener('click', () => {
        window.location.href = 'admin.html';
    });

    // Clear functionality
    clearBtn.addEventListener('click', () => {
        editableElements.forEach(element => {
            element.innerText = '';
        });
    });
});