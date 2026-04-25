document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Staggered Slide-up Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after it animates once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    
    // Apply staggered delays based on horizontal position or index if in a grid
    revealElements.forEach((el, index) => {
        const parentGrid = el.closest('.features-grid, .gallery-grid, .about-grid');
        if (parentGrid) {
            const siblings = Array.from(parentGrid.querySelectorAll('.reveal-up'));
            const siblingIndex = siblings.indexOf(el);
            // Limit delay so it doesn't take forever
            const delay = Math.min(siblingIndex * 0.15, 0.6); 
            el.style.transitionDelay = `${delay}s`;
        }
        observer.observe(el);
    });

    // Hero Parallax Effect
    const heroBg = document.getElementById('heroBg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (heroBg && scrollPosition < window.innerHeight) {
            // Move the background down slightly as we scroll down
            heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const title = item.querySelector('h4');
        const content = item.querySelector('p');
        const icon = item.querySelector('i');

        title.addEventListener('click', () => {
            const isOpen = content.style.display === 'block';
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.querySelector('p').style.display = 'none';
                otherItem.querySelector('i').style.transform = 'rotate(0deg)';
                otherItem.querySelector('h4').style.color = '';
            });

            // Toggle current FAQ
            if (!isOpen) {
                content.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
                icon.style.transition = 'transform 0.3s ease';
                title.style.color = 'var(--gold)';
            }
        });
    });

    // Smooth Scroll for Nav Links
    const mobileNav = document.querySelector('.mobile-nav-overlay');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
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
    const mobileLinks = document.querySelectorAll('.mobile-nav-links li');

    const toggleMobileMenu = () => {
        mobileNav.classList.toggle('active');
        const isOpen = mobileNav.classList.contains('active');
        mobileBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = isOpen ? 'hidden' : '';

        if (isOpen) {
            mobileLinks.forEach((link, index) => {
                link.classList.remove('active'); // Reset
                setTimeout(() => {
                    link.classList.add('active');
                }, 100 + (index * 100));
            });
        }
    };

    if(mobileBtn) {
        mobileBtn.addEventListener('click', toggleMobileMenu);
    }
});
