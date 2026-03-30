document.addEventListener('DOMContentLoaded', () => {
    // =========================================================
    // Hamburger Menu Toggle
    // =========================================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    if (hamburgerBtn && navLinks) {
        const toggleMenu = () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            if (navOverlay) navOverlay.classList.toggle('active');
        };

        hamburgerBtn.addEventListener('click', toggleMenu);

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                if (navOverlay) navOverlay.classList.remove('active');
            });
        });

        // Close menu when overlay is clicked
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                navOverlay.classList.remove('active');
            });
        }
    }

    // =========================================================
    // i18n — Language Toggle System
    // =========================================================
    const translations = {
        zh: {
            langLabel: 'EN',
            navAbout: '關於我',
            navSkills: '專業技能',
            navProjects: '專案作品',
            navContact: '聯絡方式',
            heroBtn: '查看作品',
            aboutTitle: '關於我',
            aboutText: '<strong class="about-greeting">Hi, I\'m LanLan! 👋</strong><br><br>我是一名熱衷於探索 <strong class="highlight-purple">AI Agent</strong> 與 <strong class="highlight-purple">Blockchain / Web3</strong> 領域的開發者。<br>我的目標是將先進的 AI 技術與去中心化智能合約結合，創造出具有自主決策能力的鏈上智慧應用與交易系統。<br><br>從 <strong class="highlight-cyan">AI 智能代幣分析 (Tw_Stock_Degen)</strong> 到 <strong class="highlight-cyan">DeFi 模擬交易機器人 (Paper_Degen)</strong>，我一直在跨領域的技術邊界上挑戰自我。',
            eduTitle: '學歷與研究',
            yuntech: '國立雲林科技大學 (YunTech)',
            yuntechDept: '二技部 | 資訊管理系',
            yuntechThesis: '畢業專題：結合影像辨識與自然語言控制多模態機械臂系統',
            yuntechDesc: '開發整合 <strong>聽(ASR)、想(NLP)、看(CV)、動(ACT)、說(TTS)</strong> 的五感多模態系統。<br>實現「出一張嘴」即可能直覺控制機械手臂進行精確抓取與放置任務。',
            yuntechDetail1: '<strong>核心架構：</strong>獨創 5-Thread Pipeline 多執行緒並行處理機制。',
            yuntechDetail2: '<strong>AI 模型：</strong>SenseVoice (語音識別), YOLOv8 (物件偵測), LeRobot ACT (模仿學習)。',
            yuntechDetail3: '<strong>成效：</strong>語音辨識率 >92%，動作執行成功率 >80%，系統響應 <2.8秒。',
            nutc: '國立臺中科技大學 (NUTC)',
            nutcDept: '五專部 | 資訊管理系',
            nutcThesis: '畢業專題：VR 於國中生物課程之教學應用',
            nutcDesc: '開發沉浸式 VR 教材，透過虛擬實境將抽象的神經傳導過程具象化，獲選為教育部虛擬實境教學應用計畫成果。',
            badgeExhibit: '展出',
            exhibitText: '2023 臺北世貿教育科技展',
            badgeExp: '經歷',
            expText: '北新國中試教體驗 (2023.11)',
            expDesc: '帶領學生體驗新興科技與 VR 虛擬實境應用，啟發學生對科技學習的興趣。',
            eduLinkText: '教育大市集作品頁面 ->',
            workTitle: '工作經歷',
            workCompany: '神奕科技有限公司 (Shenyi Tech)',
            workRole: '實習工程師',
            workItem1: '<strong>VR 場域建置：</strong>負責台科大、致理科大等多所院校的 VR 頭盔架設與環境部署 (HTC Vive, Meta Quest 3)。',
            workItem2: '<strong>技術支援：</strong>協助客戶進行軟硬體驅動安裝、中控設置與圖傳設備除錯。',
            workItem3: '<strong>教育訓練：</strong>擔任凱比機器人與 Rokoko 動捕設備的教育訓練講師。',
            workItem4: '<strong>專案執行：</strong>參與富春國小飛行模擬器設置與勝利國中 Insta360 環景拍攝專案。',
            skillsTitle: '技能圖譜',
            projectsTitle: '專案作品',
            proj1Desc: '自動化技術新聞聚合器與 Discord 機器人。',
            proj1F1: '監控 Gmail 並自動分類 (AI, Web3, DevOps)',
            proj1F2: '串接 Google Gemini 2.5 Flash 生成中文摘要',
            proj1F3: '發送 Markdown 格式 Discord 通知',
            proj2Desc: '結合台灣氣象與天文的 Discord/Line 智慧助理。',
            proj2F1: '整合 CWA 氣象署與 NASA APOD API',
            proj2F2: 'Gemini AI 扮演「幽默氣象播報員」',
            proj2F3: '自動生成每日天氣與天文科普報告',
            proj3Desc: '本網站的原始碼。採用 Neon Glass 風格重構。',
            proj3F1: 'HTML5 Canvas 粒子互動背景',
            proj3F2: '玻璃擬態 (Glassmorphism) UI 設計',
            proj3F3: '完全響應式與無障礙優化',
            proj4Desc: '結合 TWSE OpenAPI 與 Gemini 的台股分析 Line 機器人。',
            proj4F1: '串接證交所 API 獲取每日個股行情',
            proj4F2: '整合 Gemini 2.0 提供迷因風格盤後分析',
            proj4F3: '專為台灣散戶設計的互動式「地下投顧」',
            proj5Desc: '參與 BNB Hackathon 的 AI 加密貨幣模擬交易 Discord 機器人。',
            proj5F1: '專為 BNB Hack (AI Track) 設計開發',
            proj5F2: '提供加密貨幣市場 AI 趨勢分析',
            proj5F3: '零風險的虛擬投資與模擬交易體驗',
            viewGithub: 'GitHub 原始碼',
            exploreTitle: '探索更多',
            exploreDesc: '前往 GitHub 查看更多專案與實驗性代碼。',
            exploreBtn: '前往 GitHub',
            navDevLog: '開發日誌',
            devlogTitle: '開發日誌',
            log1: 'Sim2Real 差距縮減分析於 <span class="highlight-cyan">Isaac Sim 4.0</span>',
            log2: 'LeRobot ACT 模型訓練完成 (成功率: 82%)',
            log3: '整合 <span class="highlight-purple">SenseVoice</span> 實現多語言語音識別支援',
            log4: '解決 6-DOF 機械臂逆向運動學奇異點問題',
            eventsTitle: '社群與活動',
            eventDesc: '參加工作坊，實戰 Google AI Studio 與 Gemini Pro 模型微調 (Fine-tuning)。<br>探索 Agentic AI 與多模態應用的可能性。',
            eventBtn: '活動頁面',
            contactTitle: '聯絡方式',
            contactDesc: '有什麼有趣的想法嗎？隨時聯繫我！',
            toastMsg: 'Copied: <strong>lanlan0427</strong>'
        },
        en: {
            langLabel: '中',
            navAbout: 'About',
            navSkills: 'Skills',
            navProjects: 'Projects',
            navContact: 'Contact',
            heroBtn: 'View My Work',
            aboutTitle: 'About Me',
            aboutText: '<strong class="about-greeting">Hi, I\'m LanLan! 👋</strong><br><br>I\'m a developer passionate about <strong class="highlight-purple">AI Agents</strong> and <strong class="highlight-purple">Blockchain / Web3</strong>.<br>My goal is to combine advanced AI technologies with decentralized smart contracts to create intelligent on-chain applications and autonomous trading systems.<br><br>From <strong class="highlight-cyan">AI Token Analysis (Tw_Stock_Degen)</strong> to <strong class="highlight-cyan">DeFi Paper Trading Bots (Paper_Degen)</strong>, I\'m constantly pushing the boundaries across disciplines.',
            eduTitle: 'Education & Research',
            yuntech: 'National Yunlin University of Sci. & Tech. (YunTech)',
            yuntechDept: 'B.S. | Information Management',
            yuntechThesis: 'Thesis: Multimodal Robotic Arm System with Vision & NLP Control',
            yuntechDesc: 'Developed an integrated five-sense multimodal system: <strong>Listen (ASR), Think (NLP), See (CV), Act (ACT), Speak (TTS)</strong>.<br>Enabling intuitive voice-controlled robotic arm for precise pick-and-place tasks.',
            yuntechDetail1: '<strong>Architecture:</strong> Original 5-Thread Pipeline for parallel processing.',
            yuntechDetail2: '<strong>AI Models:</strong> SenseVoice (ASR), YOLOv8 (Object Detection), LeRobot ACT (Imitation Learning).',
            yuntechDetail3: '<strong>Results:</strong> Speech recognition >92%, Action success >80%, Response <2.8s.',
            nutc: 'National Taichung University of Sci. & Tech. (NUTC)',
            nutcDept: 'Associate Degree | Information Management',
            nutcThesis: 'Thesis: VR Application in Junior High Biology Education',
            nutcDesc: 'Developed immersive VR courseware to visualize abstract neural transmission processes. Selected by the Ministry of Education VR Teaching Initiative.',
            badgeExhibit: 'Exhibited',
            exhibitText: '2023 Taipei EdTech Exhibition',
            badgeExp: 'Experience',
            expText: 'Beixin Junior High — Teaching Demo (2023.11)',
            expDesc: 'Led students in hands-on VR experiences, inspiring interest in technology and learning.',
            eduLinkText: 'Education Marketplace ->',
            workTitle: 'Work Experience',
            workCompany: 'Shenyi Technology Co., Ltd.',
            workRole: 'Intern Engineer',
            workItem1: '<strong>VR Deployment:</strong> Set up VR headsets and environments at multiple universities (HTC Vive, Meta Quest 3).',
            workItem2: '<strong>Technical Support:</strong> Driver installation, central control setup, and video transmission debugging.',
            workItem3: '<strong>Training:</strong> Instructor for Kebbi Air Robot and Rokoko motion capture equipment.',
            workItem4: '<strong>Project Execution:</strong> Flight simulator setup and Insta360 panoramic shooting projects.',
            skillsTitle: 'Skills Sphere',
            projectsTitle: 'Projects',
            proj1Desc: 'Automated tech news aggregator & Discord bot.',
            proj1F1: 'Monitors Gmail and auto-categorizes (AI, Web3, DevOps)',
            proj1F2: 'Integrates Google Gemini 2.5 Flash for Chinese summaries',
            proj1F3: 'Sends Markdown-formatted Discord notifications',
            proj2Desc: 'A Discord/Line smart assistant combining Taiwan weather & astronomy.',
            proj2F1: 'Integrates CWA Weather Bureau & NASA APOD API',
            proj2F2: 'Gemini AI acts as a "Humorous Weather Reporter"',
            proj2F3: 'Auto-generates daily weather and astronomy reports',
            proj3Desc: 'Source code of this website. Rebuilt with Neon Glass style.',
            proj3F1: 'HTML5 Canvas interactive particle background',
            proj3F2: 'Glassmorphism UI design',
            proj3F3: 'Fully responsive with accessibility optimization',
            proj4Desc: 'Taiwan stock analysis Line Bot using TWSE OpenAPI and Gemini AI.',
            proj4F1: 'Fetches daily stock data via TWSE API',
            proj4F2: 'Meme-style market analysis powered by Gemini 2.0',
            proj4F3: 'Interactive "underground advisor" for retail investors',
            proj5Desc: 'AI crypto paper trading Discord Bot for BNB Hackathon.',
            proj5F1: 'Developed for BNB Hack: Online Edition (AI Track)',
            proj5F2: 'Provides AI-driven crypto market trend analysis',
            proj5F3: 'Risk-free virtual investing and trading experience',
            viewGithub: 'View on GitHub',
            exploreTitle: 'Explore More',
            exploreDesc: 'Check out more projects and experimental code on GitHub.',
            exploreBtn: 'Visit GitHub',
            navDevLog: 'DevLog',
            devlogTitle: 'DevLog',
            log1: 'Sim2Real gap reduction analysis in <span class="highlight-cyan">Isaac Sim 4.0</span>',
            log2: 'LeRobot ACT model training finished (Success Rate: 82%)',
            log3: 'Integrated <span class="highlight-purple">SenseVoice</span> for multilingual ASR support',
            log4: 'Resolved inverse kinematics singularity issue on 6-DOF arm',
            eventsTitle: 'Community & Events',
            eventDesc: 'Attended workshop on Google AI Studio and Gemini Pro fine-tuning.<br>Explored possibilities of Agentic AI and multimodal applications.',
            eventBtn: 'Event Page',
            contactTitle: 'Get In Touch',
            contactDesc: 'Got an interesting idea? Feel free to reach out!',
            toastMsg: 'Copied: <strong>lanlan0427</strong>'
        }
    };

    // Typewriter phrases per language
    const typewriterPhrases = {
        zh: [
            '歡迎來到我的數位空間。',
            '我用 Python 打造 AI 應用。',
            '我開發智能合約與 DApp。',
            '我探索 Agentic AI 與 Web3。'
        ],
        en: [
            'Welcome to my digital space.',
            'I build AI apps with Python.',
            'I create Smart Contracts & DApps.',
            'I explore Agentic AI & Web3.'
        ]
    };

    let currentLang = localStorage.getItem('lang') || 'zh';

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

        const dict = translations[lang];

        // Update text content (data-i18n)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });

        // Update innerHTML content (data-i18n-html)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });
    }

    // Language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            applyLanguage(newLang);
        });
    }

    // Apply saved language on load
    applyLanguage(currentLang);

    // =========================================================
    // Canvas Background Animation
    // =========================================================
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
            if (window.isMatrixMode) {
                // Return early, let the Matrix loop take over canvas
                return;
            }

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
    const outputDiv = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');

    if (input && outputDiv) {
        // ASCII Art Logo — each line wrapped individually since printLine creates separate <div>s
        const asciiLogo = [
            `<span class="ascii-art">  _                _                  </span>`,
            `<span class="ascii-art"> | |    __ _ _ __ | |    __ _ _ __    </span>`,
            `<span class="ascii-art"> | |   / _\` | '_ \\| |   / _\` | '_ \\  </span>`,
            `<span class="ascii-art"> | |__| (_| | | | | |__| (_| | | | | </span>`,
            `<span class="ascii-art"> |_____\\__,_|_| |_|_____\\__,_|_| |_| </span>`,
        ];

        const welcomeLines = [
            '',
            ' <span class="terminal-dim">╔══════════════════════════════════════╗</span>',
            ' <span class="terminal-dim">║</span>&nbsp;&nbsp;<span class="terminal-cyan">LanLanOS v2.0</span> - Personal Terminal&nbsp;&nbsp;&nbsp;<span class="terminal-dim">║</span>',
            ' <span class="terminal-dim">║</span>&nbsp;&nbsp;<span class="terminal-purple">AI Agent & Blockchain Developer</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="terminal-dim">║</span>',
            ' <span class="terminal-dim">╚══════════════════════════════════════╝</span>',
            '',
            ' Type <span class="cmd">help</span> to see available commands.',
            ''
        ];

        const commands = {
            'help': () => {
                return [
                    '<span class="terminal-dim">╭─────────────────────────────────────────╮</span>',
                    '<span class="terminal-dim">│</span>  <span class="terminal-cyan">⚡ Available Commands</span>                   <span class="terminal-dim">│</span>',
                    '<span class="terminal-dim">├─────────────────────────────────────────┤</span>',
                    '<span class="terminal-dim">│</span>  <span class="cmd">about</span>       →  Who am I?               <span class="terminal-dim">│</span>',
                    '<span class="terminal-dim">│</span>  <span class="cmd">skills</span>      →  My tech stack           <span class="terminal-dim">│</span>',
                    '<span class="terminal-dim">│</span>  <span class="cmd">projects</span>    →  What I\'ve built         <span class="terminal-dim">│</span>',
                    '<span class="terminal-dim">│</span>  <span class="cmd">education</span>   →  Academic background     <span class="terminal-dim">│</span>',
                    '<span class="terminal-dim">│</span>  <span class="cmd">experience</span>  →  Work internship         <span class="terminal-dim">│</span>',
                    '<span class="terminal-dim">│</span>  <span class="cmd">contact</span>     →  Get in touch            <span class="terminal-dim">│</span>',
                    '<span class="terminal-dim">│</span>  <span class="cmd">clear</span>       →  Clear terminal          <span class="terminal-dim">│</span>',
                    '<span class="terminal-dim">╰─────────────────────────────────────────╯</span>',
                ].join('<br>');
            },
            'sudo': () => {
                return '<span class="terminal-dim" style="color:var(--error-color, #ff4c4c)">Nice try, but you don\'t have root privileges here.</span>';
            },
            'rm -rf /': () => {
                const terminalWindow = document.querySelector('.terminal-window');
                if (terminalWindow) {
                    terminalWindow.classList.add('shake-animation');
                    setTimeout(() => terminalWindow.classList.remove('shake-animation'), 500);
                }
                return '<span style="color:var(--error-color, #ff4c4c); font-weight:bold;">Initiating Self-Destruct... Just kidding.</span>';
            },
            'web3': () => {
                return [
                    '<span class="terminal-cyan" style="white-space: pre;">       /\\       </span>',
                    '<span class="terminal-cyan" style="white-space: pre;">      /  \\      </span>',
                    '<span class="terminal-cyan" style="white-space: pre;">     /____\\     </span>',
                    '<span class="terminal-cyan" style="white-space: pre;">    /      \\    </span>',
                    '<span class="terminal-cyan" style="white-space: pre;">    \\      /    </span>',
                    '<span class="terminal-cyan" style="white-space: pre;">     \\    /     </span>',
                    '<span class="terminal-cyan" style="white-space: pre;">      \\  /      </span>',
                    '<span class="terminal-cyan" style="white-space: pre;">       \\/       </span>',
                    '<span class="terminal-dim" style="color:gold;">We\'re all gonna make it. (WAGMI)</span>',
                ].join('<br>');
            },
            'crypto': () => commands['web3'](),
            'about': () => {
                return [
                    '<span class="terminal-cyan">┌─ About Me ──────────────────────┐</span>',
                    '  Hi! I\'m <span class="terminal-cyan">LanLan</span> 👋',
                    '  An <span class="terminal-purple">AI Agent & Web3</span> Developer.',
                    '  Focusing on Smart Contracts, DApps,',
                    '  and Autonomous AI Trading Bots.',
                    '<span class="terminal-cyan">└─────────────────────────────────┘</span>',
                ].join('<br>');
            },
            'skills': () => {
                return [
                    '<span class="terminal-cyan">┌─ Tech Stack ────────────────────┐</span>',
                    '  <span class="terminal-dim">Languages:</span>  Python, JavaScript, Solidity',
                    '  <span class="terminal-dim">Web3/DeFi:</span>  Smart Contracts, Web3.js',
                    '  <span class="terminal-dim">AI/Agents:</span>  Gemini API, LangChain',
                    '  <span class="terminal-dim">Backend:  </span>  FastAPI, Node.js',
                    '  <span class="terminal-dim">Tools:    </span>  Git, Docker, Linux',
                    '<span class="terminal-cyan">└─────────────────────────────────┘</span>',
                ].join('<br>');
            },
            'projects': () => {
                return [
                    '<span class="terminal-cyan">┌─ Projects ──────────────────────┐</span>',
                    '  <span class="terminal-purple">▸</span> <span class="cmd">AI Tech News Bot</span>',
                    '    Gmail → Gemini AI → Discord',
                    '  <span class="terminal-purple">▸</span> <span class="cmd">TaiwanWeatherBot</span>',
                    '    CWA + NASA APOD → Discord',
                    '  <span class="terminal-purple">▸</span> <span class="cmd">Tw_Stock_Degen</span>',
                    '    TWSE API → Gemini AI → Line Bot',
                    '  <span class="terminal-purple">▸</span> <span class="cmd">Paper_Degen</span>',
                    '    BNB Hackathon → AI Crypto Paper Trading',
                    '  <span class="terminal-purple">▸</span> <span class="cmd">Multimodal Robotic Arm</span>',
                    '    ASR + NLP + CV + ACT + TTS',
                    '<span class="terminal-cyan">└─────────────────────────────────┘</span>',
                    '',
                    '  → <a href="#projects" style="color: var(--primary-color)">View full projects section</a>',
                ].join('<br>');
            },
            'education': () => {
                return [
                    '<span class="terminal-cyan">┌─ Education ─────────────────────┐</span>',
                    '  <span class="terminal-purple">▸</span> <span class="cmd">YunTech</span> — B.S. Info Management',
                    '    Thesis: Multimodal Robotic Arm',
                    '    (5-Thread: ASR, NLP, CV, ACT, TTS)',
                    '',
                    '  <span class="terminal-purple">▸</span> <span class="cmd">NUTC</span> — Associate, Info Management',
                    '    Thesis: VR Biology Teaching App',
                    '    📍 2023 Taipei EdTech Exhibition',
                    '<span class="terminal-cyan">└─────────────────────────────────┘</span>',
                ].join('<br>');
            },
            'experience': () => {
                return [
                    '<span class="terminal-cyan">┌─ Experience ────────────────────┐</span>',
                    '  <span class="terminal-purple">▸</span> <span class="cmd">Shenyi Technology</span> (Intern)',
                    '    VR Field Engineer / Tech Support',
                    '    • Multi-campus VR deployment',
                    '    • Kebbi Robot & Rokoko Instructor',
                    '<span class="terminal-cyan">└─────────────────────────────────┘</span>',
                ].join('<br>');
            },
            'contact': () => {
                return [
                    '<span class="terminal-cyan">┌─ Contact ───────────────────────┐</span>',
                    '  <span class="terminal-dim">GitHub:</span>   <a href="https://github.com/LanLan0427" target="_blank" style="color: var(--primary-color)">@LanLan0427</a>',
                    '  <span class="terminal-dim">Discord:</span>  lanlan0427',
                    '<span class="terminal-cyan">└─────────────────────────────────┘</span>',
                ].join('<br>');
            },
            'clear': () => {
                outputDiv.innerHTML = '';
                return '';
            }
        };

        const printLine = (text) => {
            const line = document.createElement('div');
            line.innerHTML = text;
            outputDiv.appendChild(line);
            outputDiv.scrollTop = outputDiv.scrollHeight;
        };

        function processCommand(cmd) {
            const command = cmd.trim().toLowerCase();
            if (commands[command]) {
                return commands[command]();
            } else if (command === '') {
                return '';
            } else {
                return `<span class="terminal-dim">Command not found:</span> ${command}. Type <span class="cmd">help</span> for available commands.`;
            }
        }

        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const cmd = this.value.trim();
                printLine(`<span class="terminal-dim">guest@lanlan:~$</span> ${this.value}`);

                const result = processCommand(cmd);
                if (result !== '') {
                    printLine(result);
                }

                this.value = '';
            }
        });

        // Animated ASCII Logo Greeting
        const allGreetingLines = [...asciiLogo, ...welcomeLines];
        let lineIdx = 0;
        function printNextLine() {
            if (lineIdx < allGreetingLines.length) {
                printLine(allGreetingLines[lineIdx]);
                lineIdx++;
                setTimeout(printNextLine, 60);
            }
        }
        printNextLine();
    }

    // Discord Copy Logic (Toast)
    const discordBtn = document.getElementById('discord-btn');
    const toast = document.getElementById('toast');

    if (discordBtn && toast) {
        discordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const discordId = 'lanlan0427';

            navigator.clipboard.writeText(discordId).then(() => {
                // Show Toast
                toast.classList.add('show');

                // Hide after 3 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
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
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const phrases = typewriterPhrases[currentLang];
            const currentPhrase = phrases[phraseIndex % phrases.length];

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
            'Python', 'Solidity', 'Web3.js', 'Smart Contract',
            'DeFi', 'Agentic AI', 'Gemini API', 'LangChain',
            'Discord.js', 'LineBot API', 'Git', 'Docker',
            'Linux', 'React', 'FastAPI', 'Node.js'
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

    // =========================================================
    // Scroll Reveal Animations (IntersectionObserver)
    // =========================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // =========================================================
    // Back to Top Button
    // =========================================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================================
    // Hero Parallax Effect (only hero text, NOT terminal)
    // =========================================================
    const heroCenter = document.querySelector('.hero-center');

    if (heroCenter) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const heroBottom = (heroCenter.offsetParent?.offsetTop || 0) + heroCenter.offsetHeight + 200;

                    if (scrollY < heroBottom) {
                        const parallaxOffset = scrollY * 0.3;
                        const fadeOut = Math.max(0, 1 - scrollY / (heroBottom * 0.6));

                        heroCenter.style.transform = `translateY(${parallaxOffset}px)`;
                        heroCenter.style.opacity = fadeOut;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // =========================================================
    // Active Section Highlight in Nav
    // =========================================================
    const navLinksForHighlight = document.querySelectorAll('.nav-links a[href^="#"]');
    const allSections = document.querySelectorAll('section[id]');

    if (navLinksForHighlight.length > 0 && allSections.length > 0) {
        const highlightNav = () => {
            const scrollPos = window.scrollY + 120;

            allSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinksForHighlight.forEach(link => {
                        link.classList.remove('nav-active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('nav-active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', highlightNav, { passive: true });
        highlightNav(); // Run once on load
    }

    // =========================================================
    // Mouse Spotlight Effect
    // =========================================================
    const spotlightElements = document.querySelectorAll('.glass-card, .project-card, .explore-card');

    spotlightElements.forEach(el => {
        el.classList.add('spotlight');

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            el.style.setProperty('--x', `${x}px`);
            el.style.setProperty('--y', `${y}px`);
        });
    });

    // =========================================================
    // GitHub DevLog Integration
    // =========================================================
    const devLogContent = document.querySelector('.devlog-content');

    if (devLogContent) {
        const username = 'LanLan0427';
        // Using v2 cache key to invalidate old cache for logic updates
        const cacheKey = 'github_devlog_cache_v2';
        const cacheTime = 60 * 60 * 1000; // 1 hour cache

        const renderDevLog = (logs) => {
            if (!logs || logs.length === 0) return;

            const cursorHtml = `<div class="log-entry flash-cursor" style="margin-top: 1rem;">
                                    <span class="cmd">➜</span> <span class="cursor">_</span>
                                </div>`;

            const logsHtml = logs.map(log => `
                <div class="log-entry">
                    <span class="log-date">[${log.date}]</span>
                    <span class="log-status ${log.statusClass}">${log.status}</span>
                    <span class="log-msg">${log.msg}</span>
                </div>
            `).join('');

            devLogContent.innerHTML = logsHtml + cursorHtml;
        };

        const fetchGitHubActivity = async () => {
            const cacheKey = 'github_devlog_cache_v3';
            // Check cache
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                try {
                    const { timestamp, data } = JSON.parse(cached);
                    // 1 hour cache validation
                    if (Date.now() - timestamp < cacheTime) {
                        console.log('DevLog: Using cached data', data);
                        renderDevLog(data);
                        return;
                    }
                } catch (e) {
                    console.error('DevLog: Cache parse error', e);
                    localStorage.removeItem(cacheKey);
                }
            }

            try {
                console.log(`DevLog: Fetching events for ${username}...`);
                const response = await fetch(`https://api.github.com/users/${username}/events/public`);

                if (!response.ok) {
                    if (response.status === 403) throw new Error('API Rate Limit Exceeded');
                    throw new Error(`GitHub API Error: ${response.status}`);
                }

                const events = await response.json();
                console.log('DevLog: Raw events:', events);

                const pushEvents = events
                    .filter(event => event.type === 'PushEvent');

                console.log('DevLog: Push events:', pushEvents);

                if (pushEvents.length === 0) {
                    // No public pushes found - Show message instead of static data
                    devLogContent.innerHTML = `
                        <div class="log-entry">
                            <span class="log-status status-wip">INFO</span>
                            <span class="log-msg">No recent public activity found on GitHub.</span>
                        </div>
                        <div class="log-entry flash-cursor" style="margin-top: 1rem;">
                            <span class="cmd">➜</span> <span class="cursor">_</span>
                        </div>`;
                    return;
                }

                // Take recent 5
                const recentPushes = pushEvents.slice(0, 5);

                const logs = await Promise.all(recentPushes.map(async event => {
                    const repoName = event.repo.name.replace(`${username}/`, '');
                    const date = new Date(event.created_at).toISOString().split('T')[0];

                    let commitMsg = '';

                    // Try to get message from payload
                    if (event.payload.commits && event.payload.commits.length > 0) {
                        commitMsg = event.payload.commits[0].message;
                    } else if (event.payload.head) {
                        // Fetch individual commit details if missing in payload
                        try {
                            const commitResp = await fetch(`https://api.github.com/repos/${event.repo.name}/commits/${event.payload.head}`);
                            if (commitResp.ok) {
                                const commitData = await commitResp.json();
                                commitMsg = commitData.commit.message;
                            }
                        } catch (e) {
                            console.warn(`DevLog: Failed to fetch commit details for ${event.repo.name}`, e);
                        }
                    }

                    if (!commitMsg) {
                        commitMsg = `Update code in ${repoName}`;
                    }

                    // Truncate to first line
                    commitMsg = commitMsg.split('\n')[0];

                    // Determine Status
                    let status = 'PUSH';
                    let statusClass = 'status-wip';

                    const lowerMsg = commitMsg.toLowerCase();
                    if (lowerMsg.startsWith('feat')) { status = 'FEAT'; statusClass = 'status-feat'; }
                    else if (lowerMsg.startsWith('fix')) { status = 'FIX'; statusClass = 'status-fix'; }
                    else if (lowerMsg.startsWith('docs')) { status = 'DOCS'; statusClass = 'status-done'; }
                    else if (lowerMsg.startsWith('style') || lowerMsg.startsWith('refactor')) { status = 'CODE'; statusClass = 'status-feat'; }
                    else if (lowerMsg.startsWith('perf')) { status = 'PERF'; statusClass = 'status-done'; }
                    else if (lowerMsg.startsWith('test')) { status = 'TEST'; statusClass = 'status-done'; }
                    else if (lowerMsg.startsWith('chore')) { status = 'CHORE'; statusClass = 'status-wip'; }
                    else if (lowerMsg.startsWith('build') || lowerMsg.startsWith('ci')) { status = 'CI/CD'; statusClass = 'status-wip'; }

                    // Format Message
                    let formattedMsg = commitMsg.replace(new RegExp(repoName, 'gi'), `<span class="highlight-cyan">${repoName}</span>`);
                    if (!formattedMsg.toLowerCase().includes(repoName.toLowerCase())) {
                        formattedMsg += ` in <span class="highlight-cyan">${repoName}</span>`;
                    }

                    formattedMsg = formattedMsg.replace(/(v\d+\.\d+)/g, '<span class="highlight-purple">$1</span>');

                    return { date, status, statusClass, msg: formattedMsg };
                }));

                // Cache data
                localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: logs }));
                renderDevLog(logs);

            } catch (error) {
                console.warn('DevLog fetch failed:', error);
                // Show Error in UI
                devLogContent.innerHTML = `
                    <div class="log-entry">
                        <span class="log-status status-fix">ERR</span>
                        <span class="log-msg">Failed to load GitHub activity: ${error.message}</span>
                    </div>
                    <div class="log-entry flash-cursor" style="margin-top: 1rem;">
                        <span class="cmd">➜</span> <span class="cursor">_</span>
                    </div>`;
            }
        };

        fetchGitHubActivity();
    }

    // =========================================================
    // Easter Egg: Matrix Mode (Konami Code)
    // =========================================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    // Make it global so the canvas loop can read it
    window.isMatrixMode = false;
    let matrixInterval = null;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateMatrixMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
            // Retry for partial match start
            if (e.key === konamiCode[0] || e.key.toLowerCase() === konamiCode[0].toLowerCase()) {
                konamiIndex = 1;
            }
        }
    });

    function activateMatrixMode() {
        if (window.isMatrixMode) return;
        window.isMatrixMode = true;

        // Apply CSS overrides
        document.body.classList.add('matrix-mode');

        // Show Toast
        if (toast) {
            toast.innerHTML = 'Wake up, Neo... <br><strong style="color:#00FF41">Matrix Mode Activated</strong>';
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                // Reset toast content roughly after it hides
                setTimeout(() => toast.innerHTML = translations[currentLang].toastMsg, 500);
            }, 4000);
        }

        // Setup Digital Rain Canvas
        const bgCanvas = document.getElementById('bg-canvas');
        if (!bgCanvas) return;
        const ctx = bgCanvas.getContext('2d');

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
        const fontSize = 16;
        let columns = Math.floor(bgCanvas.width / fontSize);
        let drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        ctx.font = fontSize + 'px var(--font-mono)';

        function drawMatrix() {
            // Check canvas resize
            const currentCols = Math.floor(bgCanvas.width / fontSize);
            if (columns !== currentCols) {
                columns = currentCols;
                drops = [];
                for (let x = 0; x < columns; x++) {
                    drops[x] = 1;
                }
            }

            // Translucent black to create trail effect
            ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
            ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

            ctx.fillStyle = '#00FF41';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > bgCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        if (matrixInterval) clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, 35);
    }

    // =========================================================
    // Easter Egg: Black Hole Portal to Pixelverse (CodePen Version)
    // =========================================================
    function initBlackHole(elementSelector) {
        const el = document.querySelector(elementSelector);
        if (!el) return;

        let h = el.offsetHeight,
            w = el.offsetWidth,
            cw = w,
            ch = h,
            maxorbit = cw / 2, // distance from center
            centery = ch / 2,
            centerx = cw / 2;

        let startTime = new Date().getTime();
        let currentTime = 0;

        let stars = [],
            collapse = false, // if hovered
            expanse = false; // if clicked

        const canvas = document.createElement('canvas');
        canvas.width = cw;
        canvas.height = ch;
        el.appendChild(canvas);
        const context = canvas.getContext("2d");

        context.globalCompositeOperation = "screen";

        function setDPI(canvas, dpi) {
            if (!canvas.style.width) canvas.style.width = canvas.width + 'px';
            if (!canvas.style.height) canvas.style.height = canvas.height + 'px';

            let scaleFactor = dpi / 96;
            canvas.width = Math.ceil(canvas.width * scaleFactor);
            canvas.height = Math.ceil(canvas.height * scaleFactor);
            let ctx = canvas.getContext('2d');
            ctx.scale(scaleFactor, scaleFactor);
        }

        function rotate(cx, cy, x, y, angle) {
            let radians = angle,
                cos = Math.cos(radians),
                sin = Math.sin(radians),
                nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            return [nx, ny];
        }

        setDPI(canvas, 192);

        var Star = function () {
            let rands = [];
            rands.push(Math.random() * (maxorbit / 2) + 1);
            rands.push(Math.random() * (maxorbit / 2) + maxorbit);

            this.orbital = (rands.reduce((p, c) => p + c, 0) / rands.length);
            this.x = centerx;
            this.y = centery + this.orbital;
            this.yOrigin = centery + this.orbital;
            this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180;
            this.rotation = 0;
            this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;
            this.id = stars.length;
            this.collapseBonus = this.orbital - (maxorbit * 0.7);
            if (this.collapseBonus < 0) this.collapseBonus = 0;

            stars.push(this);
            // White particles to blend perfectly into the background
            this.color = 'rgba(255, 255, 255,' + (1 - ((this.orbital) / maxorbit)) + ')';

            this.hoverPos = centery + (maxorbit / 2) + this.collapseBonus;
            this.expansePos = centery + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1);

            this.prevR = this.startRotation;
            this.prevX = this.x;
            this.prevY = this.y;
        }

        Star.prototype.draw = function () {
            if (!expanse) {
                this.rotation = this.startRotation + (currentTime * this.speed);
                if (!collapse) {
                    if (this.y > this.yOrigin) {
                        this.y -= 2.5;
                    }
                    if (this.y < this.yOrigin - 4) {
                        this.y += (this.yOrigin - this.y) / 10;
                    }
                } else {
                    this.trail = 1;
                    if (this.y > this.hoverPos) {
                        this.y -= (this.hoverPos - this.y) / -5;
                    }
                    if (this.y < this.hoverPos - 4) {
                        this.y += 2.5;
                    }
                }
            } else {
                this.rotation = this.startRotation + (currentTime * (this.speed / 2));
                if (this.y > this.expansePos) {
                    this.y -= Math.floor(this.expansePos - this.y) / -140;
                }
            }

            context.save();
            context.fillStyle = this.color;
            context.strokeStyle = this.color;
            context.beginPath();
            let oldPos = rotate(centerx, centery, this.prevX, this.prevY, -this.prevR);
            context.moveTo(oldPos[0], oldPos[1]);
            context.translate(centerx, centery);
            context.rotate(this.rotation);
            context.translate(-centerx, -centery);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.restore();

            this.prevR = this.rotation;
            this.prevX = this.x;
            this.prevY = this.y;
        }

        const centerHover = el.querySelector('.centerHover');
        if (centerHover) {
            centerHover.addEventListener('click', function (e) {
                e.preventDefault();
                if (expanse) return; // Prevent double clicks

                collapse = false;
                expanse = true;
                centerHover.classList.add('open');

                // Get portal center coordinates for animation origin
                const rect = el.getBoundingClientRect();
                const originX = rect.left + rect.width / 2;
                const originY = rect.top + rect.height / 2;

                // Set origin on body for scaling
                document.body.style.transformOrigin = `${originX}px ${originY}px`;
                document.body.classList.add('sucked-into-portal');

                setTimeout(function () {
                    window.location.href = 'pixel.html';
                }, 2000); // Wait for CSS animation to complete
            });
            centerHover.addEventListener('mouseover', function () {
                if (expanse == false) collapse = true;
            });
            centerHover.addEventListener('mouseout', function () {
                if (expanse == false) collapse = false;
            });
        }

        window.requestFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
        })();

        function loop() {
            let now = new Date().getTime();
            currentTime = (now - startTime) / 50;
            context.globalCompositeOperation = "source-over"; // reset composite for drawing background trail
            context.fillStyle = 'rgba(10,10,10,0.3)'; // Dark bg for trail
            context.fillRect(0, 0, cw, ch);

            context.globalCompositeOperation = "screen"; // Additive blending for stars
            for (let i = 0; i < stars.length; i++) {
                if (stars[i] != stars) stars[i].draw();
            }
            requestFrame(loop);
        }

        function init() {
            context.fillStyle = 'rgba(10,10,10,1)';
            context.fillRect(0, 0, cw, ch);
            for (let i = 0; i < 1500; i++) new Star(); // 1500 particles
            loop();
        }
        init();
    }

    // initBlackHole('#blackhole-portal-container');
});
