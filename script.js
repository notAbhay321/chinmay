document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ScrollReveal animations
    ScrollReveal().reveal('.hero-content', { 
        origin: 'bottom', 
        distance: '50px', 
        duration: 1000, 
        delay: 200 
    });
    ScrollReveal().reveal('.about', { 
        origin: 'left', 
        distance: '50px', 
        duration: 1000, 
        delay: 200 
    });
    ScrollReveal().reveal('.treatment-card', { 
        origin: 'bottom', 
        distance: '50px', 
        duration: 1000, 
        interval: 200 
    });
    ScrollReveal().reveal('.benefit-card', { 
        origin: 'bottom', 
        distance: '50px', 
        duration: 1000, 
        interval: 200 
    });
    ScrollReveal().reveal('.testimonial-card', { 
        origin: 'bottom', 
        distance: '50px', 
        duration: 1000, 
        interval: 200 
    });

    // Smooth scroll animation for the entire page
    const smoothScroll = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothScroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    };

    // Trigger smooth scroll on page load
    window.addEventListener('load', smoothScroll);

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    const sections = document.querySelectorAll('.scroll-section');
    const dots = document.querySelectorAll('.dot');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSection = entry.target.id;
                updateActiveDot(activeSection);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    function updateActiveDot(activeSection) {
        dots.forEach(dot => {
            if (dot.dataset.section === activeSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = document.getElementById(dot.dataset.section);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    let currentSectionIndex = 0;
    let isScrolling = false;

    const scrollToSection = (index) => {
        if (index >= 0 && index < sections.length) {
            isScrolling = true;
            sections[index].scrollIntoView({ behavior: 'smooth' });
            currentSectionIndex = index;
            setTimeout(() => {
                isScrolling = false;
            }, 1000); // Adjust timeout to match the scroll duration
        }
    };

    window.addEventListener('wheel', (event) => {
        if (isScrolling) return;

        if (event.deltaY > 0) {
            // Scroll down
            scrollToSection(currentSectionIndex + 1);
        } else {
            // Scroll up
            scrollToSection(currentSectionIndex - 1);
        }
    });

    // Optional: Add keyboard navigation
    window.addEventListener('keydown', (event) => {
        if (isScrolling) return;

        if (event.key === 'ArrowDown') {
            scrollToSection(currentSectionIndex + 1);
        } else if (event.key === 'ArrowUp') {
            scrollToSection(currentSectionIndex - 1);
        }
    });
});
