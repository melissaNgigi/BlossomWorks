// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const contactBar = document.querySelector('.top-contact-bar');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        contactBar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        contactBar.classList.remove('scrolled');
    }
});

// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// React Components
// Testimonial Slider Component
const testimonials = [
    {
        id: 1,
        content: "BlossomWorks transformed our operations and helped us achieve a 30% increase in efficiency within just three months.",
        author: "Jane Smith",
        position: "CEO, Example Company"
    },
    {
        id: 2,
        content: "The strategic insights provided by BlossomWorks were invaluable to our business growth. Their team is professional and delivers results.",
        author: "John Doe",
        position: "Director, Global Enterprises"
    },
    {
        id: 3,
        content: "Working with BlossomWorks has been a game-changer for our organization. Their training programs are exceptional.",
        author: "Sarah Johnson",
        position: "HR Manager, Tech Solutions"
    }
];

// Testimonial Component
function TestimonialSlider() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return React.createElement(
        'div',
        { className: 'testimonial-slider' },
        React.createElement(
            'div',
            { className: 'testimonial' },
            React.createElement(
                'div',
                { className: 'testimonial-content' },
                React.createElement('p', {}, `"${testimonials[currentIndex].content}"`)
            ),
            React.createElement(
                'div',
                { className: 'testimonial-author' },
                React.createElement('h4', {}, testimonials[currentIndex].author),
                React.createElement('p', {}, testimonials[currentIndex].position)
            )
        )
    );
}

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
        this.startAutoPlay();
        this.addEventListeners();
        this.goToSlide(this.currentSlide); // Set initial slide
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
        document.querySelector('.prev-btn').addEventListener('click', () => {
            this.stopAutoPlay();
            this.prevSlide();
            this.startAutoPlay();
        });

        document.querySelector('.next-btn').addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide();
            this.startAutoPlay();
        });
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