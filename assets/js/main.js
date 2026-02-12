document.addEventListener('DOMContentLoaded', () => {
    // Canvas Background Animation (Existing)
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width, height;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        // Configuration
        const STAR_COUNT = 150;
        const SHOOTING_STAR_FREQ = 0.01; // Easy to adjust frequency

        let stars = [];
        let shootingStars = [];
        let mouse = { x: width / 2, y: height / 2 };

        // Mouse Move Event for Parallax
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2;
                this.speed = Math.random() * 0.05; // Parallax speed factor
                this.brightness = Math.random();
            }

            update() {
                // Parallax Effect: Move stars opposite to mouse
                const dx = (width / 2 - mouse.x) * this.speed;
                const dy = (height / 2 - mouse.y) * this.speed;

                this.currentX = this.x + dx;
                this.currentY = this.y + dy;

                // Twinkle effect
                this.brightness += (Math.random() - 0.5) * 0.1;
                if (this.brightness > 1) this.brightness = 1;
                if (this.brightness < 0.2) this.brightness = 0.2;
            }

            draw() {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
                ctx.arc(this.currentX, this.currentY, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class ShootingStar {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height * 0.5; // Start from top half
                this.length = Math.random() * 80 + 20;
                this.speed = Math.random() * 10 + 5;
                this.angle = Math.PI / 4; // 45 degrees
                this.opacity = 0;
                this.active = false;
                this.color = Math.random() > 0.5 ? '#00f3ff' : '#bc00dd'; // Cyan or Purple
            }

            ignite() {
                this.active = true;
                this.opacity = 1;
                this.x = Math.random() * width * 1.5 - width * 0.5; // Wider spawn area
                this.y = -50;
            }

            update() {
                if (!this.active) return;

                this.x += this.speed * Math.cos(this.angle);
                this.y += this.speed * Math.sin(this.angle);
                this.opacity -= 0.01;

                if (this.opacity <= 0 || this.y > height || this.x > width) {
                    this.active = false;
                    this.reset();
                }
            }

            draw() {
                if (!this.active) return;

                ctx.beginPath();
                const tailX = this.x - this.length * Math.cos(this.angle);
                const tailY = this.y - this.length * Math.sin(this.angle);

                const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'transparent');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();
            }
        }

        function init() {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star());
            }
            // Prepare a pool of shooting stars
            for (let i = 0; i < 3; i++) {
                shootingStars.push(new ShootingStar());
            }
        }

        function animate() {
            // Dark trail effect for cinematic feel
            ctx.fillStyle = 'rgba(10, 10, 20, 0.2)'; // Dark blueish trail
            ctx.fillRect(0, 0, width, height);

            // Draw Stars
            stars.forEach(star => {
                star.update();
                star.draw();
            });

            // Handle Shooting Stars
            if (Math.random() < SHOOTING_STAR_FREQ) {
                const inactiveStar = shootingStars.find(s => !s.active);
                if (inactiveStar) inactiveStar.ignite();
            }

            shootingStars.forEach(s => {
                s.update();
                s.draw();
            });

            requestAnimationFrame(animate);
        }

        init();
        animate();
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hacker Terminal Logic
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');

    if (input && output) {
        const commands = {
            'help': 'Available commands: about, skills, projects, contact, clear',
            'about': 'I am LanLan, a developer who loves building cool things.',
            'skills': 'Python, JavaScript, Discord.js, Gemini AI, Git, Docker, React',
            'projects': 'Check out the Projects section below!',
            'contact': 'GitHub: https://github.com/LanLan0427\nDiscord: lanlan0427',
            'clear': 'clear'
        };

        const printLine = (text) => {
            const line = document.createElement('div');
            line.textContent = text;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        };

        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const cmd = this.value.trim().toLowerCase();
                printLine(`guest@lanlan:~$ ${this.value}`);

                if (commands[cmd]) {
                    if (cmd === 'clear') {
                        output.innerHTML = '';
                    } else {
                        printLine(commands[cmd]);
                    }
                } else if (cmd !== '') {
                    printLine(`Command not found: ${cmd}. Type 'help' for available commands.`);
                }

                this.value = '';
            }
        });

        // Initial greeting
        printLine('Welcome to LanLanOS v1.0. Type "help" to start.');
    }

    // Discord Copy Logic
    const discordBtn = document.getElementById('discord-btn');
    if (discordBtn) {
        discordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const discordId = 'lanlan0427';
            navigator.clipboard.writeText(discordId).then(() => {
                const originalHtml = discordBtn.innerHTML;
                discordBtn.innerHTML = 'Copied! <i class="fas fa-check"></i>';
                discordBtn.style.borderColor = '#27c93f';
                discordBtn.style.color = '#27c93f';

                setTimeout(() => {
                    discordBtn.innerHTML = originalHtml;
                    discordBtn.style.borderColor = 'var(--secondary-color)';
                    discordBtn.style.color = 'var(--secondary-color)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // ---------------------------------------------------------
    // Typewriter Effect (Hero Section)
    // ---------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const phrases = [
            'Welcome to my digital space.',
            'I build cool things with Python.',
            'I create Discord Bots.',
            'I explore AI agents.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Deleting speed
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Typing speed
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before new phrase
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // ---------------------------------------------------------
    // 3D Skill Sphere (TagCloud.js)
    // ---------------------------------------------------------
    const tagCloudContainer = document.getElementById('tagcloud-container');
    if (tagCloudContainer) {
        const myTags = [
            'Python', 'JavaScript', 'HTML5', 'CSS3',
            'Discord.js', 'Google Apps Script', 'Gemini AI',
            'Git', 'GitHub', 'VS Code', 'Docker',
            'API Integration', 'Automation', 'React'
        ];

        // Config for TagCloud
        // Reference: https://github.com/mcc108/TagCloud
        try {
            TagCloud(tagCloudContainer, myTags, {
                radius: 200, // Size of the sphere
                maxSpeed: 'normal', // 'slow', 'normal', 'fast'
                initSpeed: 'normal',
                direction: 135,
                keep: true, // Keep rolling after mouse leave
                useContainerInlineStyles: false,
                itemClass: 'tagcloud-item' // Add CSS class if needed
            });
        } catch (e) {
            console.error('TagCloud failed to load:', e);
            tagCloudContainer.innerHTML = 'Skills: ' + myTags.join(', ');
        }

        // Custom styling for tags via JS (optional, but ensures visibility)
        const style = document.createElement('style');
        style.innerHTML = `
            .tagcloud-item {
                font-size: 1.2rem;
                font-family: 'Courier New', monospace;
                color: #00f3ff;
                text-shadow: 0 0 5px #00f3ff;
                cursor: pointer;
                transition: color 0.3s;
            }
            .tagcloud-item:hover {
                color: #bc00dd;
                text-shadow: 0 0 10px #bc00dd;
            }
        `;
        document.head.appendChild(style);
    }
});
