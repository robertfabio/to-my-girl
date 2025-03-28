// Inicializar partículas
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ff6b6b"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    image: {
                        src: "img/github.svg",
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff6b6b",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "bubble"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 200,
                        size: 6,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Efeito de scroll suave
    document.querySelectorAll('.scroll-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Animação de seções ao scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Controle de música - Justin Bieber - Company
    const musicControl = document.getElementById('musicControl');
    
    // Criar elemento de iframe para o YouTube (invisível)
    const youtubeContainer = document.createElement('div');
    youtubeContainer.style.position = 'fixed';
    youtubeContainer.style.bottom = '0';
    youtubeContainer.style.right = '0';
    youtubeContainer.style.width = '1px';
    youtubeContainer.style.height = '1px';
    youtubeContainer.style.visibility = 'hidden';
    document.body.appendChild(youtubeContainer);
    
    // ID do vídeo do YouTube (Company - Justin Bieber)
    const videoId = 'DsoDYUMz6QY';
    // Começar em 2:38 (158 segundos)
    const startTime = 158;
    
    // Criar elemento para o player do YouTube
    const youtubePlayerDiv = document.createElement('div');
    youtubePlayerDiv.id = 'youtube-player';
    youtubeContainer.appendChild(youtubePlayerDiv);
    
    // Carregar a API do YouTube
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    let player;
    let isPlaying = false;
    
    // Função chamada quando a API do YouTube está pronta
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-player', {
            height: '1',
            width: '1',
            videoId: videoId,
            playerVars: {
                'autoplay': 0,
                'start': startTime,
                'controls': 0,
                'showinfo': 0,
                'rel': 0,
                'loop': 1,
                'playlist': videoId
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    };
    
    // Função chamada quando o player está pronto
    function onPlayerReady(event) {
        // Player está pronto para ser usado
        musicControl.style.opacity = '1';
    }

    musicControl.addEventListener('click', function() {
        if (isPlaying) {
            // Pausar o vídeo do YouTube
            if (player && typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
            this.innerHTML = '<i class="music-icon">♫</i>';
            this.classList.remove('playing');
        } else {
            // Tocar o vídeo do YouTube
            if (player && typeof player.playVideo === 'function') {
                player.playVideo();
            }
            this.innerHTML = '<i class="music-icon">■</i>';
            this.classList.add('playing');
            // Ativar confete quando a música começa
            showConfetti();
        }
        isPlaying = !isPlaying;
    });
    
    // Verificar se o player está pronto e tentar inicializar novamente se necessário
    setTimeout(() => {
        if (!player || (player && typeof player.getPlayerState === 'function' && player.getPlayerState() === -1)) {
            // Recriar o player se ele não estiver pronto
            if (youtubePlayerDiv) {
                youtubePlayerDiv.innerHTML = '';
                window.onYouTubeIframeAPIReady();
            }
        }
    }, 3000);
    
    // Não é necessário criar o elemento novamente, já foi criado acima

    // Efeito de confete
    let confettiCanvas = document.getElementById('confetti');
    let confetti;

    function showConfetti() {
        confettiCanvas.style.display = 'block';
        if (typeof ConfettiGenerator !== 'undefined') {
            confetti = new ConfettiGenerator({
                target: 'confetti',
                max: 80,
                size: 1.5,
                animate: true,
                props: ['circle', 'square', 'triangle', 'line'],
                colors: [[255, 107, 107], [255, 142, 142], [255, 255, 255], [255, 192, 203]],
                clock: 25,
                rotate: true
            });
            confetti.render();
            
            setTimeout(() => {
                confetti.clear();
                confettiCanvas.style.display = 'none';
            }, 5000);
        }
    }

    // Criar corações flutuantes aleatoriamente
    function createRandomHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.top = Math.random() * 100 + '%';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        document.querySelector('header').appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    // Criar corações a cada 3 segundos
    setInterval(createRandomHeart, 3000);

    // Efeito de digitação para a mensagem principal
    const typingText = document.querySelector('.typing-effect');
    if (typingText) {
        typingText.style.width = '0';
        setTimeout(() => {
            typingText.style.width = '100%';
        }, 1000);
    }

    // Adicionar efeito 3D de inclinação aos cards
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX * 10; // max 10 degrees
            const deltaY = (y - centerY) / centerY * 10; // max 10 degrees
            
            this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            setTimeout(() => {
                this.style.transition = 'transform 0.5s ease';
            }, 100);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'none';
        });
    });

    // Adicionar efeito de destaque ao passar o mouse sobre as razões
    const reasonItems = document.querySelectorAll('.reason-item');
    reasonItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            reasonItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.opacity = '0.6';
                    otherItem.style.transform = 'scale(0.95)';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            reasonItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = '';
            });
        });
    });

    // Adicionar efeito de texto digitado para a mensagem
    const messageText = document.querySelector('.message-text');
    if (messageText) {
        const originalText = messageText.innerHTML;
        messageText.innerHTML = '';
        
        let isTyping = false;
        
        const typeWriter = (text, i, fnCallback) => {
            if (i < text.length) {
                messageText.innerHTML = text.substring(0, i+1) + '<span class="cursor">|</span>';
                
                // Esperar um pouco mais em pontuações
                let delay = 30;
                const char = text.charAt(i);
                if (['.', ',', '!', '?'].includes(char)) delay = 300;
                
                setTimeout(() => {
                    typeWriter(text, i + 1, fnCallback);
                }, delay);
            } else if (typeof fnCallback === 'function') {
                setTimeout(fnCallback, 700);
                messageText.innerHTML = text;
            }
        };
        
        // Iniciar a digitação quando a seção estiver visível
        const messageSection = document.getElementById('message');
        const messageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isTyping) {
                    isTyping = true;
                    typeWriter(originalText, 0, null);
                }
            });
        }, { threshold: 0.5 });
        
        messageObserver.observe(messageSection);
    }

    // Adicionar efeito de paralaxe no fundo
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.querySelector('header').style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });

    // Adicionar efeito de brilho ao passar o mouse sobre o título
    const title = document.querySelector('h1');
    if (title) {
        title.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    }

    // Adicionar efeito de clique no botão
    const btn = document.querySelector('.btn');
    if (btn) {
        btn.addEventListener('click', function(e) {
            // Criar círculo de ondulação
            const circle = document.createElement('div');
            circle.classList.add('ripple');
            this.appendChild(circle);
            
            // Posicionar o círculo onde o usuário clicou
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            circle.style.width = circle.style.height = `${size}px`;
            circle.style.left = `${e.clientX - rect.left - size/2}px`;
            circle.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Remover o círculo após a animação
            setTimeout(() => {
                circle.remove();
            }, 600);
        });
    }

    // Adicionar efeito de neve de corações
    function createHeartSnow() {
        const heart = document.createElement('div');
        heart.classList.add('heart-snow');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = Math.random() * 10 + 10 + 'px';
        heart.innerHTML = '❤';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Criar neve de corações a cada 300ms
    setInterval(createHeartSnow, 300);

    // Adicionar efeito de surpresa ao clicar no título
    if (title) {
        title.addEventListener('click', function() {
            showConfetti();
            // Adicionar classe para animar o título
            this.classList.add('title-clicked');
            setTimeout(() => {
                this.classList.remove('title-clicked');
            }, 1000);
        });
    }
});