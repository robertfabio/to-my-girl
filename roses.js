// Script para os efeitos de rosas e animações - Versão melhorada

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const loveButton = document.getElementById('loveButton');
    const rosesContainer = document.getElementById('rosesContainer');
    const loveMessage = document.getElementById('loveMessage');
    
    // URLs das imagens de rosa (usando SVG em arquivos externos para melhor qualidade)
    const roseImagePaths = [
        // Rosa vermelha clássica
        'images/rose-red.svg',
        // Rosa rosa
        'images/rose-pink.svg',
        // Rosa roxa
        'images/rose-purple.svg'
    ];
    
    // Pré-carregar as imagens
    const roseImages = [];
    roseImagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
        roseImages.push(img);
    });
    
    // SVG para pétalas de rosa (versão melhorada)
    const petalSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
                <radialGradient id="petalGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stop-color="#ffb6c1" />
                    <stop offset="70%" stop-color="#ff3366" />
                    <stop offset="100%" stop-color="#cc0033" />
                </radialGradient>
            </defs>
            <path fill="url(#petalGradient)" d="M50 0 C 60 40 90 50 50 100 C 10 50 40 40 50 0"/>
        </svg>
    `;
    
    // Função para criar uma rosa
    function createRose() {
        const rose = document.createElement('div');
        rose.classList.add('rose');
        rose.style.left = Math.random() * 100 + 'vw';
        
        // Tamanho aleatório para as rosas (40px a 70px) - aumentado para melhor visualização
        const size = Math.random() * 30 + 40;
        rose.style.width = size + 'px';
        rose.style.height = size + 'px';
        
        // Velocidade aleatória para a queda
        const duration = Math.random() * 4 + 3;
        rose.style.animationDuration = duration + 's';
        
        // Selecionar uma rosa aleatória do array
        const randomRoseIndex = Math.floor(Math.random() * roseImages.length);
        
        // Criar elemento de imagem para a rosa
        const roseImg = document.createElement('img');
        roseImg.src = roseImagePaths[randomRoseIndex];
        roseImg.style.width = '100%';
        roseImg.style.height = '100%';
        rose.appendChild(roseImg);
        
        // Adicionar efeito de rotação e balanço
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;
        const rotationAmount = Math.random() * 360 * rotationDirection;
        const swayAmount = Math.random() * 100 + 50;
        
        rose.style.animation = `fallDown ${duration}s ease-in forwards, 
                               sway ${Math.random() * 2 + 2}s ease-in-out infinite alternate, 
                               rotate ${Math.random() * 4 + 3}s linear infinite`;
        
        // Adicionar estilo de rotação e balanço
        rose.style.setProperty('--rotation-end', `${rotationAmount}deg`);
        rose.style.setProperty('--sway-amount', `${swayAmount}px`);
        
        return rose;
    }
    
    // Função para criar uma pétala
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        
        // Tamanho aleatório para as pétalas (10px a 20px)
        const size = Math.random() * 10 + 10;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        
        // Cor aleatória para as pétalas
        const colors = ['#ff3366', '#ff66a3', '#ff99cc', '#ff6b6b'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        petal.innerHTML = petalSVG.replace('#ff3366', randomColor);
        
        // Velocidade e estilo de queda aleatórios
        const duration = Math.random() * 5 + 5;
        petal.style.animation = `floatDown ${duration}s ease-in-out forwards, 
                               spin ${Math.random() * 4 + 3}s linear infinite, 
                               sway ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
        
        return petal;
    }
    
    // Função para criar um brilho
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Tamanho aleatório para os brilhos
        const size = Math.random() * 15 + 10;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        // Posição com pequena variação aleatória
        const offsetX = Math.random() * 40 - 20;
        const offsetY = Math.random() * 40 - 20;
        sparkle.style.left = (x + offsetX) + 'px';
        sparkle.style.top = (y + offsetY) + 'px';
        
        // Cores aleatórias para os brilhos
        const colors = ['#FFD700', '#FFC0CB', '#FF69B4', '#FF1493', '#FFFFFF'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.setProperty('--sparkle-color', randomColor);
        
        document.body.appendChild(sparkle);
        
        // Remover o brilho após a animação
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    // Função para mostrar as rosas
    function showRoses() {
        rosesContainer.style.display = 'block';
        
        // Criar e adicionar 100 rosas (aumentado de 50 para 100)
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const rose = createRose();
                rosesContainer.appendChild(rose);
                
                // Remover a rosa após a animação
                setTimeout(() => {
                    rose.remove();
                }, 8000); // Aumentado de 6000 para 8000
            }, i * 80); // Reduzido de 100 para 80 para criar mais rosas rapidamente
        }
        
        // Adicionar pétalas flutuantes
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const petal = createPetal();
                rosesContainer.appendChild(petal);
                
                // Remover a pétala após a animação
                setTimeout(() => {
                    petal.remove();
                }, 10000);
            }, i * 150);
        }
        
        // Mostrar a mensagem de amor após um pequeno atraso
        setTimeout(() => {
            loveMessage.classList.add('show');
        }, 1500);
        
        // Adicionar brilhos aleatórios (aumentado de 30 para 60)
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createSparkle(x, y);
            }, i * 150); // Reduzido de 200 para 150 para criar mais brilhos rapidamente
        }
        
        // Adicionar mais brilhos em ondas
        for (let wave = 0; wave < 3; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const x = Math.random() * window.innerWidth;
                        const y = Math.random() * window.innerHeight;
                        createSparkle(x, y);
                    }, i * 100);
                }
            }, wave * 2000 + 3000); // Criar ondas de brilhos a cada 2 segundos, começando após 3 segundos
        }
    }
    
    // Evento de clique no botão de amor
    loveButton.addEventListener('click', function(e) {
        // Efeito de ondulação no botão
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const x = e.clientX - this.getBoundingClientRect().left;
        const y = e.clientY - this.getBoundingClientRect().top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Mostrar as rosas e a mensagem
        showRoses();
    });
    
    // Fechar a mensagem de amor ao clicar nela
    loveMessage.addEventListener('click', function() {
        this.classList.remove('show');
        
        // Limpar as rosas
        rosesContainer.innerHTML = '';
        rosesContainer.style.display = 'none';
    });
});