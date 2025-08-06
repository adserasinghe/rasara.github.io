 // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Digital Clock
        function updateClock() {
            const now = new Date();
            const options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            
            const timeString = now.toLocaleDateString('en-US', options);
            document.getElementById('digitalClock').textContent = timeString;
        }

        // Update clock every second
        setInterval(updateClock, 1000);
        updateClock(); // Initial call

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Check for saved theme preference or use default
        const savedTheme = 'light-theme'; // Default theme since localStorage isn't available
        body.className = savedTheme;

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('light-theme')) {
                body.className = 'dark-theme';
                // Theme preference will persist during the session
            } else {
                body.className = 'light-theme';
                // Theme preference will persist during the session
            }
        });

        // Typing Effect
        const typingText = document.getElementById('typingText');
        const texts = ['Your Name', 'a Developer', 'a Designer', 'a Creator'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 200;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Start typing effect
        setTimeout(typeWriter, 1000);

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Skills Progress Animation with proper timing
        function animateSkills() {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                // Add delay for each bar
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, index * 200);
            });
        }

        // Trigger skills animation when section is in view
        const skillsSection = document.getElementById('skills');
        let skillsAnimated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    animateSkills();
                    skillsAnimated = true;
                }
            });
        }, {
            threshold: 0.5
        });

        if (skillsSection) {
            observer.observe(skillsSection);
        }

        // Add scroll effect to navbar with proper theme handling
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.background = body.classList.contains('dark-theme') 
                        ? 'rgba(30, 41, 59, 0.98)' 
                        : 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = body.classList.contains('dark-theme') 
                        ? 'rgba(30, 41, 59, 0.95)' 
                        : 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
                }
            }
        });

        // Form submission (you can customize this)
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });

        // Optimized parallax effect for better performance
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Add fade-in animation to elements on scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });

        fadeElements.forEach(el => fadeObserver.observe(el));