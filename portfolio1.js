document.addEventListener("DOMContentLoaded", () => {
    // ================= PRELOADER =================
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
    });

    // ================= NAVBAR TOGGLE =================
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');

    if (navContainer) {
        const hamburger = document.createElement('div');
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        navContainer.appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            hamburger.classList.toggle('active');
        });
    }

    // ================= SMOOTH SCROLL =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            if (navLinks) navLinks.classList.remove('show');
            const hamburgerBtn = document.querySelector('.hamburger');
            if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        });
    });

    // ================= THEME TOGGLE =================
    const toggleBtn = document.createElement('button');
    toggleBtn.className = "theme-toggle";
    document.body.appendChild(toggleBtn);

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    function updateThemeLabel() {
        if (document.body.classList.contains('light-mode')) {
            toggleBtn.textContent = "🌙 Dark Mode";
        } else {
            toggleBtn.textContent = "☀️ Light Mode";
        }
    }
    updateThemeLabel();

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
        updateThemeLabel();
    });

    // ================= SCROLL REVEAL =================
    const revealElements = document.querySelectorAll('.container, .project-card');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            if (position < windowHeight - 80) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ================= HERO TEXT ANIMATION =================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = "";
        let i = 0;

        function typeEffect() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeEffect, 80);
            }
        }
        setTimeout(typeEffect, 500);
    }

    // ================= CONTACT FORM HANDLING =================
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async(e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("https://formspree.io/f/xpwyznvp", {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    window.location.href = "thankyou.html";
                } else {
                    alert("Oops! Something went wrong. Please try again.");
                }
            } catch (error) {
                alert("Error submitting form. Please check your connection.");
            }
        });
    }
});