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

                // 2. Move hero
                hero.style.left = `${targetX}px`;
                hero.style.top = `${targetY}px`;

                // 3. Wait for walking animation (css transition is 0.5s) then open modal
                setTimeout(() => {
                    const targetModalId = this.getAttribute('data-target');
                    const targetModal = document.getElementById(targetModalId);
                    if (targetModal) {
                        targetModal.classList.remove('hidden');
                    }
                }, 500);
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

    document.addEventListener("DOMContentLoaded", function () {
        typeWriter();
        initWorldMap();
        initTransitions();
    });

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
