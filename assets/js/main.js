document.addEventListener('DOMContentLoaded', () => {
    // Canvas Background Animation (Existing)
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = Math.random() * 0.5 - 0.25;
                this.vy = Math.random() * 0.5 - 0.25;
                this.size = Math.random() * 150 + 50;
                this.color = Math.random() > 0.5 ? '#00f3ff' : '#bc00dd';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < -this.size) this.x = width + this.size;
                if (this.x > width + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = height + this.size;
                if (this.y > height + this.size) this.y = -this.size;
            }

            draw() {
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.globalAlpha = 0.1;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            for (let i = 0; i < 15; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
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
