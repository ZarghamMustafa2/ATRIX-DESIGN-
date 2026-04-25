document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach((el, index) => {
        // Add staggered delay for mobile specifically if they are cards or portfolio items
        if (window.innerWidth < 768) {
            const parent = el.closest('.service-interactive-grid, .compact-portfolio');
            if (parent) {
                const children = Array.from(parent.querySelectorAll('.reveal'));
                const childIndex = children.indexOf(el);
                el.style.transitionDelay = `${childIndex * 0.15}s`;
            }
        }
        observer.observe(el);
    });

    // Mouse-Move Parallax for Ambient Orbs
    const orbs = document.querySelectorAll('.ambient-orb');

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return; // Disable parallax on mobile
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // More subtle movement for the large orbs
        const moveX = (mouseX - centerX) / 80;
        const moveY = (mouseY - centerY) / 80;

        orbs.forEach((orb, index) => {
            const depth = (index + 1) * 0.8;
            const x = moveX * depth;
            const y = moveY * depth;
            
            // Note: We're adding to the translation, but CSS animations might override this if they don't use variables.
            // Let's use CSS variables for parallax so they combine with the float animation.
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Interactive Expandable Cards Logic
    const cards = document.querySelectorAll('.expandable-card');
    cards.forEach(card => {
        // Touch Pulse Effect
        card.addEventListener('touchstart', () => {
            card.classList.add('pulse-touch');
            setTimeout(() => card.classList.remove('pulse-touch'), 600);
        }, { passive: true });

        card.addEventListener('click', (e) => {
            if (card.classList.contains('active')) {
                if (e.target.closest('.close-card')) {
                    card.classList.remove('active');
                }
                return;
            }
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });

    document.querySelectorAll('.close-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.expandable-card');
            card.classList.remove('active');
        });
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Logic
    const mobileBtn = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links li');

    const toggleMobileMenu = () => {
        mobileNav.classList.toggle('active');
        const isOpen = mobileNav.classList.contains('active');
        mobileBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = isOpen ? 'hidden' : '';

        if (isOpen) {
            mobileLinks.forEach((link, index) => {
                link.style.transitionDelay = `${0.2 + index * 0.1}s`;
            });
        }
    };

    mobileBtn.addEventListener('click', toggleMobileMenu);
});
