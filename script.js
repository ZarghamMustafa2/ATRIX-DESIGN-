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

    // Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const frameRate = 1000 / 60;
                const totalFrames = Math.round(duration / frameRate);
                let currentFrame = 0;
                
                const easeOutQuad = t => t * (2 - t);
                
                const counterInterval = setInterval(() => {
                    currentFrame++;
                    const progress = easeOutQuad(currentFrame / totalFrames);
                    const currentCount = Math.round(endValue * progress);
                    
                    target.innerText = currentCount;
                    
                    if (currentFrame === totalFrames) {
                        clearInterval(counterInterval);
                        target.innerText = endValue;
                    }
                }, frameRate);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    if(mobileBtn) {
        mobileBtn.addEventListener('click', toggleMobileMenu);
    }

    // Project Modal Logic
    const projectModal = document.getElementById('projectModal');
    const startProjectBtns = document.querySelectorAll('a[href="#project-form"]');
    const closeModal = document.getElementById('closeModal');
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('nextStep');
    const prevBtn = document.getElementById('prevStep');
    const submitBtn = document.getElementById('submitForm');
    const indicators = document.querySelectorAll('.indicator-dot');
    let currentStep = 1;

    const updateStep = () => {
        formSteps.forEach(step => step.classList.remove('active'));
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        
        indicators.forEach((ind, idx) => {
            ind.classList.toggle('active', idx < currentStep);
        });

        prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
        if (currentStep === formSteps.length) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    };

    startProjectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Grid Selectors
    const selectors = document.querySelectorAll('.selector-item');
    selectors.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.querySelectorAll('.selector-item').forEach(s => s.classList.remove('selected'));
            item.classList.add('selected');
        });
    });

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            currentStep++;
            updateStep();
            projectModal.querySelector('.modal-container').scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStep();
            projectModal.querySelector('.modal-container').scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    function validateStep(step) {
        const stepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = stepEl.querySelectorAll('input[required], select[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff4d4d';
                valid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        if (step === 2 && !document.querySelector('#projectTypeSelector .selected')) {
            alert('Please select a project type');
            valid = false;
        }
        if (step === 3 && !document.querySelector('#plotSizeSelector .selected')) {
            alert('Please select plot dimensions');
            valid = false;
        }

        return valid;
    }

    // Form Submission
    document.getElementById('projectLeadForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Success! Your legacy project request has been received. Our luxury consultants will call you shortly.');
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
            e.target.reset();
            currentStep = 1;
            updateStep();
            btn.innerText = 'Submit Project';
            btn.disabled = false;
        }, 1500);
    });

    // Cost Estimator Logic
    const estArea = document.getElementById('estArea');
    const estTotal = document.getElementById('estTotal');
    const qualitySelectors = document.querySelectorAll('#estQuality .selector-item');
    const scopeSelectors = document.querySelectorAll('#estScope .selector-item');

    const calculateCost = () => {
        const area = parseFloat(estArea.value) || 0;
        const selectedQuality = document.querySelector('#estQuality .selector-item.selected');
        const selectedScope = document.querySelector('#estScope .selector-item.selected');
        
        if (!selectedQuality || !selectedScope) return;

        const rate = parseFloat(selectedQuality.getAttribute('data-rate'));
        const multiplier = parseFloat(selectedScope.getAttribute('data-multiplier'));
        
        const total = area * rate * multiplier;
        estTotal.innerText = Math.round(total).toLocaleString();
    };

    if (estArea) {
        estArea.addEventListener('input', calculateCost);
        qualitySelectors.forEach(s => s.addEventListener('click', () => {
            setTimeout(calculateCost, 10);
        }));
        scopeSelectors.forEach(s => s.addEventListener('click', () => {
            setTimeout(calculateCost, 10);
        }));
        calculateCost(); // Initial calculation
    }
});
