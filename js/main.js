document.addEventListener('DOMContentLoaded', () => {
    const featureItems = document.querySelectorAll('.feature-item');

    // Observer options
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const typeWriter = (element, text, speed = 30) => {
        return new Promise(resolve => {
            let i = 0;
            element.textContent = '';

            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    };

    const animateFeature = async (item) => {
        const h4 = item.querySelector('h4');
        const p = item.querySelector('p');

        // Store original text
        const h4Text = h4.textContent;
        const pText = p.textContent;

        // Clear text initially
        h4.textContent = '';
        p.textContent = '';

        // Make item visible (you might want to use CSS opacity for this)
        item.style.opacity = '1';

        // Type H4 then P
        await typeWriter(h4, h4Text, 50);
        await typeWriter(p, pText, 30);
    };

    // Sequential animation for all items
    const startAnimation = async () => {
        for (const item of featureItems) {
            await animateFeature(item);
        }
    };

    // Start slightly after load
    setTimeout(startAnimation, 500);

    // --- Portfolio Slider Logic ---
    const pTrack = document.querySelector('.portfolio-slider-track');
    const pPrevBtn = document.querySelector('.portfolio-prev');
    const pNextBtn = document.querySelector('.portfolio-next');
    const pItems = document.querySelectorAll('.portfolio-item');

    if (pTrack && pPrevBtn && pNextBtn && pItems.length > 0) {
        // Clone items for infinite effect
        pItems.forEach(item => {
            const clone = item.cloneNode(true);
            pTrack.appendChild(clone);
        });

        const allPItems = document.querySelectorAll('.portfolio-item');
        const totalOriginal = pItems.length;
        let pCurrentIndex = 0;
        let pIsTransitioning = false;

        const updatePortfolioSlider = (animate = true) => {
            const itemWidth = allPItems[0].offsetWidth + 10; // offsetWidth + gap

            if (!animate) {
                pTrack.style.transition = 'none';
            } else {
                pTrack.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            }

            pTrack.style.transform = `translateX(-${pCurrentIndex * itemWidth}px)`;

            if (!animate) {
                pTrack.offsetHeight; // force repaint
                pTrack.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            }
        };

        const handlePNext = () => {
            if (pIsTransitioning) return;
            pIsTransitioning = true;
            pCurrentIndex++;
            updatePortfolioSlider();
        };

        const handlePPrev = () => {
            if (pIsTransitioning) return;
            pIsTransitioning = true;
            pCurrentIndex--;
            updatePortfolioSlider();
        };

        pTrack.addEventListener('transitionend', () => {
            pIsTransitioning = false;
            if (pCurrentIndex >= totalOriginal) {
                pCurrentIndex = 0;
                updatePortfolioSlider(false);
            } else if (pCurrentIndex < 0) {
                pCurrentIndex = totalOriginal - 1;
                updatePortfolioSlider(false);
            }
        });

        pNextBtn.addEventListener('click', handlePNext);
        pPrevBtn.addEventListener('click', handlePPrev);

        window.addEventListener('resize', () => updatePortfolioSlider(false));
        setTimeout(() => updatePortfolioSlider(false), 100);
    }

    // --- Why Choose Us? (Benefits) Slider Logic ---
    const benefitTrack = document.querySelector('.benefit-track');
    const bPrevBtn = document.querySelector('.benefit-prev');
    const bNextBtn = document.querySelector('.benefit-next');
    const bSlides = document.querySelectorAll('.benefit-slide');

    if (benefitTrack && bPrevBtn && bNextBtn && bSlides.length > 0) {
        // Clone slides for infinite effect
        bSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            benefitTrack.appendChild(clone);
        });

        const allSlides = document.querySelectorAll('.benefit-slide');
        const totalOriginal = bSlides.length;
        let bCurrentIndex = 0;
        let isTransitioning = false;

        const updateBenefitSlider = (animate = true) => {
            const slideWidth = allSlides[0].offsetWidth + 30; // slide width + margin/gap

            if (!animate) {
                benefitTrack.style.transition = 'none';
            } else {
                benefitTrack.style.transition = 'transform 0.5s ease';
            }

            benefitTrack.style.transform = `translateX(-${bCurrentIndex * slideWidth}px)`;

            if (!animate) {
                // Force repaint and restore transition
                benefitTrack.offsetHeight;
                benefitTrack.style.transition = 'transform 0.5s ease';
            }
        };

        const handleNext = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            bCurrentIndex++;
            updateBenefitSlider();
        };

        const handlePrev = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            bCurrentIndex--;
            updateBenefitSlider();
        };

        benefitTrack.addEventListener('transitionend', () => {
            isTransitioning = false;

            // Loop logic: if we go past the original set, jump back seamlessly
            if (bCurrentIndex >= totalOriginal) {
                bCurrentIndex = 0;
                updateBenefitSlider(false);
            }
            // If we go before the first one, jump to the start of the cloned set
            else if (bCurrentIndex < 0) {
                bCurrentIndex = totalOriginal - 1;
                updateBenefitSlider(false);
            }
        });

        bNextBtn.addEventListener('click', handleNext);
        bPrevBtn.addEventListener('click', handlePrev);

        // Initialize and handle resize
        window.addEventListener('resize', () => updateBenefitSlider(false));
        setTimeout(() => updateBenefitSlider(false), 100);
    }

    // --- Scroll Progress Bar Logic ---
    const progressContainer = document.querySelector('.scroll-progress-container');
    const progressBar = document.getElementById('progressBar');

    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // --- Project Mini Slider Logic (Serenity) ---
    const startMiniSlider = () => {
        const sliders = document.querySelectorAll('.project-mini-slider');

        sliders.forEach(slider => {
            const images = slider.querySelectorAll('img');
            if (images.length <= 1) return;

            let currentIndex = 0;

            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 3000); // Change image every 3 seconds
        });
    };

    // --- Navbar Active State (Scroll-Spy) Logic ---
    const sections = document.querySelectorAll('header[id], section[id], #contact');
    const navLinks = document.querySelectorAll('.header-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the middle of viewport
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const navObserver = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        if (section.id) navObserver.observe(section);
    });

    // --- Navbar Toggle logic ---
    const navToggle = document.querySelector('.nav-toggle');
    const headerNav = document.querySelector('.header-nav');

    if (navToggle && headerNav) {
        navToggle.addEventListener('click', () => {
            headerNav.classList.toggle('nav-active');
            navToggle.classList.toggle('nav-active');
        });

        // Close menu when clicking a link
        const navLinksForToggle = headerNav.querySelectorAll('a');
        navLinksForToggle.forEach(link => {
            link.addEventListener('click', () => {
                headerNav.classList.remove('nav-active');
                navToggle.classList.remove('nav-active');
            });
        });
    }

    // --- Dynamic Year Logic ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    startMiniSlider();
});
