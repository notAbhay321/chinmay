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

    // Hero Slideshow
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'flex';
            } else {
                slide.style.display = 'none';
            }
        });

        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Start the slideshow
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Form Submission Handler
    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced form validation
            const name = e.target.querySelector('input[placeholder="Full Name"]').value;
            const email = e.target.querySelector('input[placeholder="Email Address"]').value;
            const phone = e.target.querySelector('input[placeholder="Phone Number"]').value;
            const message = e.target.querySelector('textarea').value;

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

    // Treatment Card Hover Effects
    function initializeTreatmentCards() {
        const treatmentCards = document.querySelectorAll('.treatment-card');
        treatmentCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = 'none';
            });
        });
    }

    // Initialize components
    initializeTreatmentCards();
});