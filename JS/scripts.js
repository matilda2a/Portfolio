emailjs.init("c1BDlHwKmG0wux2l0");

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Active navigation link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && subject && message) {
        emailjs.sendForm(
            'service_gyadyr9',  
            'template_8c5kqxb',    
            contactForm,          
            'c1BDlHwKmG0wux2l0'      
        )
        .then(() => {
            showCustomAlert("Thank you for your interest! We will review your message and get back to you soon.");
            contactForm.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            showCustomAlert('Oops! Something went wrong. Please try again later.');
        });
    } else {
        showCustomAlert('Oops! All fields are required to proceed.');
    }
});


function showCustomAlert(message) {
    document.getElementById('alert-message').textContent = message;
    document.getElementById('custom-alert').style.display = 'flex';
}

function closeCustomAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}

// Theme switcher
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
}

// Load theme on page load
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
});
