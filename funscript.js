document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hamburger Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('nav');

    hamburgerMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Form Submission Handler
    const appointmentForm = document.querySelector('.contact-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced form validation
            const name = e.target.querySelector('input[name="name"]').value;
            const email = e.target.querySelector('input[name="email"]').value;
            const phone = e.target.querySelector('input[name="phone"]').value;
            const message = e.target.querySelector('textarea[name="message"]').value;

            if (validateForm(name, email, phone, message)) {
                submitAppointmentRequest(name, email, phone, message);
            }
        });
    }

    // Form Validation Function
    function validateForm(name, email, phone, message) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

        if (!name || name.length < 2) {
            showModal('Validation Error', 'Please enter a valid name.');
            return false;
        }

        if (!emailRegex.test(email)) {
            showModal('Validation Error', 'Please enter a valid email address.');
            return false;
        }

        if (!phoneRegex.test(phone)) {
            showModal('Validation Error', 'Please enter a valid phone number.');
            return false;
        }

        if (!message || message.length < 10) {
            showModal('Validation Error', 'Please provide a detailed description of your health concern.');
            return false;
        }

        return true;
    }

    // Appointment Submission Function
    function submitAppointmentRequest(name, email, phone, message) {
        // In a real-world scenario, this would be an AJAX call to a backend server
        // For demonstration, we'll use a simulated successful submission
        showModal('Appointment Request Submitted', `
            Thank you, ${name}! 
            
            We have received your appointment request. Our team will contact you at ${email} or ${phone} within 24 hours to confirm your consultation.
            
            Preliminary message review: ${message.substring(0, 100)}...`
        );
        
        // Reset form after submission
        appointmentForm.reset();
    }

    // Modal Functionality
    function showModal(title, content) {
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalHeader.innerHTML = `<h3>${title}</h3>`;

        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.innerHTML = `<p>${content}</p>`;

        const modalClose = document.createElement('button');
        modalClose.classList.add('modal-close');
        modalClose.innerHTML = '&times;';
        modalClose.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });

        modalHeader.appendChild(modalClose);
        modal.appendChild(modalHeader);
        modal.appendChild(modalBody);
        modalOverlay.appendChild(modal);

        document.body.appendChild(modalOverlay);

        // Close modal if clicked outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
    }

    // FAQ Section
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // FAQ Search Functionality
    const faqSearchInput = document.querySelector('.faq-search input');
    if (faqSearchInput) {
        faqSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            faqItems.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('p').textContent.toLowerCase();
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});