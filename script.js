document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    hamburgerMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });

    // fullPage.js initialization
    new fullpage('#fullpage', {
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        anchors: ['home', 'about', 'treatments', 'testimonials', 'gallery', 'blog', 'contact'],
        menu: 'nav ul',
        afterLoad: function(origin, destination, direction) {
            var loadedSection = this;

            // Add active class to the current navigation item
            document.querySelectorAll('nav ul li').forEach(function(item) {
                item.classList.remove('active');
            });
            document.querySelector('nav ul li[data-menuanchor="' + destination.anchor + '"]').classList.add('active');
        }
    });
});
