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

    revealElements.forEach(el => observer.observe(el));

    // Mouse-Move Parallax for Background Geometric Elements
    const bgElements = document.querySelector('.geometric-elements');
    const shapes = document.querySelectorAll('.shape, .line-element');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate offset based on screen center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (mouseX - centerX) / 50;
        const moveY = (mouseY - centerY) / 50;

        shapes.forEach((shape, index) => {
            const depth = (index + 1) * 0.5; // Different depth for each shape
            const x = moveX * depth;
            const y = moveY * depth;
            
            // We preserve original rotation if any (simplified here)
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Interactive Expandable Cards Logic
    const cards = document.querySelectorAll('.expandable-card');
    cards.forEach(card => {
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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
