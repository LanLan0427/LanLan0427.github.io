document.addEventListener('DOMContentLoaded', () => {

    // Typewriter Effect Variables
    const textArray = [
        "Hello! I am LanLan.",
        "Welcome to my Pixelverse.",
        "I'm an AI Agent & Web3 Dev.",
        "Feel free to explore the map!"
    ];
    let textIndex = 0;
    let charIndex = 0;
    const typeSpeed = 100;
    const eraseSpeed = 50;
    const delayBetweenTexts = 2000;
    let isDeleting = false;

    function typeWriter() {
        const targetElement = document.getElementById("typewriter-text");
        if (!targetElement) return;

        let currentText = textArray[textIndex];

        if (isDeleting) {
            targetElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            targetElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeTimer = typeSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            typeTimer = delayBetweenTexts;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeTimer = 500;
        }

        setTimeout(typeWriter, typeTimer);
    }

    // RPG World Map Logic
    function initWorldMap() {
        const hero = document.getElementById('hero-character');
        const landmarks = document.querySelectorAll('.landmark');
        const modals = document.querySelectorAll('.pixel-modal');
        const closeBtns = document.querySelectorAll('.close-modal');

        // Close Modals
        const closeAllModals = () => {
            modals.forEach(modal => modal.classList.add('hidden'));
        };

        closeBtns.forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });

        // Close modal if clicked outside content
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeAllModals();
                }
            });
        });

        // Landmark Click -> Move Hero -> Open Modal
        landmarks.forEach(landmark => {
            landmark.addEventListener('click', function () {
                // 1. Calculate positions relative to map container
                const mapRect = document.querySelector('.rpg-world-map').getBoundingClientRect();
                const landmarkRect = this.getBoundingClientRect();

                // Calculate center of landmark relative to map
                const targetX = (landmarkRect.left - mapRect.left) + (landmarkRect.width / 2) - 15; // 15 is half hero width
                const targetY = (landmarkRect.top - mapRect.top) + (landmarkRect.height / 2) - 15;

                // 2. Play Audio if we had it, and animate hero
                const currentX = parseFloat(hero.style.left) || 135; // Default starts
                const currentY = parseFloat(hero.style.top) || 235;

                if (typeof anime !== 'undefined') {
                    // Anime.js Arc Jump
                    anime({
                        targets: hero,
                        left: targetX,
                        top: targetY,
                        duration: 800,
                        easing: 'easeInOutQuad',
                        // Create a jumping arc by manipulating translateY during the move
                        update: function (anim) {
                            // Calculate a parabola for the jump height based on progress (0 to 1)
                            const progress = anim.progress / 100;
                            const jumpHeight = 50; // How high it jumps
                            // Parabola equation: max at progress 0.5
                            const yOffset = -jumpHeight * 4 * progress * (1 - progress);

                            // Apply the arc translation on top of the absolute positioning
                            hero.style.transform = `translateY(${yOffset}px)`;
                        },
                        complete: function () {
                            // Reset transform just in case
                            hero.style.transform = 'translateY(0)';

                            // 3. Open Modal
                            const targetModalId = landmark.getAttribute('data-target');
                            const targetModal = document.getElementById(targetModalId);
                            if (targetModal) {
                                targetModal.classList.remove('hidden');
                            }
                        }
                    });
                } else {
                    // Fallback to CSS jumping generic if anime fails
                    hero.style.left = `${targetX}px`;
                    hero.style.top = `${targetY}px`;
                    setTimeout(() => {
                        const targetModalId = landmark.getAttribute('data-target');
                        const targetModal = document.getElementById(targetModalId);
                        if (targetModal) {
                            targetModal.classList.remove('hidden');
                        }
                    }, 500);
                }
            });
        });
    }

    // Page Transition Logic
    function initTransitions() {
        const returnBtn = document.getElementById('return-btn');
        if (returnBtn) {
            returnBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');

                // Add a glitch out effect before leaving
                document.body.style.animation = 'glitch-out 1s forwards';

                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            });
        }
    }

    // Initialize all logic
    typeWriter();
    initWorldMap();
    initTransitions();

    // Add audio hover effect (simulated with random background colors if needed, keeping it simple for now)
    const buttons = document.querySelectorAll('.pixel-btn, .quest-item');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Could play a tiny beep sound here if we had an asset
            btn.style.borderColor = '#FFD700'; // Highlight gold on hover
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.borderColor = '#000';
        });
    });
});
