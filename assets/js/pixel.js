document.addEventListener('DOMContentLoaded', () => {
    // RPG Dialog Typewriter Effect
    const dialogText = document.getElementById('typewriter-text');
    const continueIcon = document.querySelector('.dialog-continue');

    const messages = [
        "Welcome to the Pixelverse! (＊°▽°＊)",
        "I'm LanLan, building cute AI & Web3 stuff.",
        "Take a look at my inventory and quests!",
        "It's dangerous to go alone! Take this code."
    ];

    let msgIndex = 0;
    let charIndex = 0;
    let isTyping = false;
    let typeTimer;

    function typeWriter() {
        if (charIndex < messages[msgIndex].length) {
            isTyping = true;
            continueIcon.style.display = 'none';
            dialogText.textContent += messages[msgIndex].charAt(charIndex);
            charIndex++;
            typeTimer = setTimeout(typeWriter, 50); // Speed of typing
        } else {
            isTyping = false;
            continueIcon.style.display = 'inline-block';
        }
    }

    function nextMessage() {
        if (isTyping) {
            // Force finish current line if clicked early
            clearTimeout(typeTimer);
            dialogText.textContent = messages[msgIndex];
            charIndex = messages[msgIndex].length;
            isTyping = false;
            continueIcon.style.display = 'inline-block';
        } else {
            msgIndex++;
            if (msgIndex >= messages.length) {
                msgIndex = 0; // Loop back
            }
            charIndex = 0;
            dialogText.textContent = '';
            typeWriter();
        }
    }

    // Start first message
    setTimeout(typeWriter, 500);

    // Click dialog box to advance text
    const dialogBox = document.querySelector('.dialog-box');
    if (dialogBox) {
        dialogBox.addEventListener('click', nextMessage);
        dialogBox.style.cursor = 'pointer';
    }

    // Return to Reality (Escape Pixelverse)
    const returnBtn = document.getElementById('return-btn');
    if (returnBtn) {
        returnBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Glitch/Fade transition
            document.body.style.transition = 'all 1s ease';
            document.body.style.transform = 'scale(5) rotate(10deg)';
            document.body.style.opacity = '0';
            document.body.style.filter = 'blur(20px)';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

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
