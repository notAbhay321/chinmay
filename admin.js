document.addEventListener('DOMContentLoaded', function() {
    const writeBlogBtn = document.getElementById('write-blog');
    const editContactBtn = document.getElementById('edit-contact');
    const logoutBtn = document.getElementById('logout');
    const blogForm = document.getElementById('blog-form');
    const contactForm = document.getElementById('contact-form');
    const newBlogPost = document.getElementById('new-blog-post');
    const editContactInfo = document.getElementById('edit-contact-info');
    const message = document.getElementById('message');

    // Check if user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            // No user is signed in, redirect to login
            window.location.href = 'login.html';
        }
    });

    writeBlogBtn.addEventListener('click', function() {
        blogForm.style.display = 'block';
        contactForm.style.display = 'none';
    });

    editContactBtn.addEventListener('click', function() {
        contactForm.style.display = 'block';
        blogForm.style.display = 'none';
    });

    logoutBtn.addEventListener('click', function() {
        firebase.auth().signOut().then(() => {
            window.location.href = 'login.html';
        }).catch((error) => {
            console.error('Error signing out: ', error);
        });
    });

    newBlogPost.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('blog-title').value;
        const content = document.getElementById('blog-content').value;
        const image = document.getElementById('blog-image').files[0];

        if (image) {
            const storageRef = firebase.storage().ref('blog-images/' + image.name);
            storageRef.put(image).then(function(snapshot) {
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    saveBlogPost(title, content, downloadURL);
                });
            });
        } else {
            saveBlogPost(title, content);
        }
    });

    function saveBlogPost(title, content, imageUrl = null) {
        firebase.firestore().collection('blog-posts').add({
            title: title,
            content: content,
            imageUrl: imageUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            message.textContent = 'Blog post published successfully!';
            message.className = 'success';
            newBlogPost.reset();
        })
        .catch((error) => {
            message.textContent = 'Error publishing blog post: ' + error.message;
            message.className = 'error';
        });
    }

    editContactInfo.addEventListener('submit', function(e) {
        e.preventDefault();
        const address = document.getElementById('clinic-address').value;
        const phone = document.getElementById('clinic-phone').value;
        const email = document.getElementById('clinic-email').value;

        firebase.firestore().collection('clinic-info').doc('contact').set({
            address: address,
            phone: phone,
            email: email
        })
        .then(() => {
            message.textContent = 'Contact information updated successfully!';
            message.className = 'success';
        })
        .catch((error) => {
            message.textContent = 'Error updating contact information: ' + error.message;
            message.className = 'error';
        });
    });
});