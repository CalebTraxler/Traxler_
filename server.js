// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animation for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animateElements = () => {
        const elements = document.querySelectorAll('.service-card, .about-text, .feature-image');
        elements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    };

    animateElements();

    // Mobile menu toggle
    let isMenuOpen = false;
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = `
        <span class="menu-icon"></span>
    `;

    // Add mobile menu button to navbar on small screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMobileMenu = (e) => {
        if (e.matches) {
            if (!document.querySelector('.mobile-menu-button')) {
                const navContent = document.querySelector('.nav-content');
                navContent.appendChild(mobileMenuButton);
            }
        } else {
            mobileMenuButton.remove();
        }
    };

    mediaQuery.addListener(handleMobileMenu);
    handleMobileMenu(mediaQuery);

    // Mobile menu functionality
    mobileMenuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        const navLinks = document.querySelector('.nav-links');
        
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = '#000000';
            navLinks.style.padding = '1rem';
        } else {
            navLinks.style.display = 'none';
        }
        
        mobileMenuButton.classList.toggle('active');
    });

    // Form validation (if contact form is added)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add your form validation and submission logic here
            console.log('Form submitted');
        });
    }

    // Dynamic copyright year
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Performance optimization
    window.addEventListener('load', () => {
        // Defer non-critical images
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    });
});
