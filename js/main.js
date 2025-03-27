// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const contactBar = document.querySelector('.top-contact-bar');
    const floatingContacts = document.getElementById('floatingContacts');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        contactBar.classList.add('hidden');
        floatingContacts.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        contactBar.classList.remove('hidden');
        floatingContacts.classList.remove('show');
    }
});

// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Mobile Navigation - Fixed version for all pages
    console.log("DOM loaded - initializing mobile menu");
    
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        console.log("Found hamburger and navLinks elements");
        
        hamburger.addEventListener('click', function(e) {
            console.log("Hamburger clicked");
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log("Nav menu toggled:", navLinks.classList.contains('active'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    } else {
        console.error("Hamburger or navLinks elements not found!");
        // Log all elements with IDs to help debug
        console.log("All elements with IDs:", document.querySelectorAll('[id]'));
    }

    // Back to Top Button - Enhanced for Mobile
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Check initial scroll position
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        }
    }
});

// Render the React component
const testimonialContainer = document.getElementById('testimonialSlider');
if (testimonialContainer) {
    ReactDOM.render(
        React.createElement(TestimonialSlider, null),
        testimonialContainer
    );
}

// Hero Carousel
const carousel = {
    slides: document.querySelectorAll('.carousel-slide'),
    currentSlide: 0,
    interval: null,

    init() {
        // Only initialize if there are slides
        if (this.slides.length > 0) {
            this.startAutoPlay();
            this.addEventListeners();
            this.goToSlide(this.currentSlide); // Set initial slide
        }
    },

    goToSlide(index) {
        // Ensure the index is within bounds
        if (index < 0) index = this.slides.length - 1;
        if (index >= this.slides.length) index = 0;

        // Hide current slide
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.remove('active');
        }

        // Update current slide
        this.currentSlide = index;

        // Show new slide
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.add('active');
        }
    },

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    },

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    },

    startAutoPlay() {
        this.interval = setInterval(() => this.nextSlide(), 5000);
    },

    stopAutoPlay() {
        clearInterval(this.interval);
    },

    addEventListeners() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        // Only add event listeners if the buttons exist
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.prevSlide();
                this.startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            });
        }
    }
};

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
});

// EmailJS Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS user ID
    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading message
            formStatus.textContent = "Sending...";
            formStatus.style.color = "#333";
            formStatus.style.display = "block";
            
            // Send the email using EmailJS
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    // Success message
                    formStatus.textContent = "Your message has been sent successfully!";
                    formStatus.style.color = "green";
                    
                    // Reset the form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        formStatus.style.display = "none";
                    }, 5000);
                }, function(error) {
                    // Error message
                    formStatus.textContent = "Oops! Something went wrong. Please try again later.";
                    formStatus.style.color = "red";
                    console.log('EmailJS Error:', error);
                });
        });
    }
});

// Course Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons that open modals
    const modalButtons = document.querySelectorAll('[data-toggle="modal"]');
    
    // Add click event to each button
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModal = document.querySelector(this.getAttribute('data-target'));
            if (targetModal) {
                targetModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
            }
        });
    });
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Add click event to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});

// Auto update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});

document.addEventListener("scroll", function () {
    // Make sure the elements exist before trying to manipulate them
    let asterisk = document.querySelector(".asterisk");
    let approachSection = document.querySelector(".approach-section");
    
    if (!asterisk || !approachSection) {
        console.log("Asterisk or approach section not found");
        return;
    }
    
    // Log for debugging
    console.log("Scrolling, found elements");
    
    // Get the section's position relative to the viewport
    let sectionRect = approachSection.getBoundingClientRect();
    
    // Calculate a position value between 0-100% based on the section's position
    let progress = 0;
    
    // Only calculate progress when the section is visible
    if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
        // Calculate how far through the section we've scrolled (0-100%)
        progress = Math.max(0, Math.min(100, 
            (1 - (sectionRect.top / window.innerHeight)) * 100
        ));
        console.log("Progress:", progress);
    }
    
    // Apply the transform - use a fixed pixel amount for testing
    asterisk.style.transform = `translate(-50%, ${progress}px) rotate(${progress * 2}deg)`;
    
    // Log the current transform
    console.log("Transform:", asterisk.style.transform);
}); 