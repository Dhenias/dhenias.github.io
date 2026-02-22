// Sound effects for buttons
function playClickSound() {
    const audio = new Audio('portfolio/sound/click.wav');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Audio play failed:', err));
}

// Add click sound to all buttons
document.querySelectorAll('.link-btn').forEach(button => {
    button.addEventListener('click', () => {
        playClickSound();
    });
});

// Interactive background particles
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#F4D35E' : '#B8C1EC';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = '#F4D35E';
                ctx.globalAlpha = (100 - distance) / 500;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mode toggle
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.querySelector('.mode-icon');
const body = document.body;

const savedMode = localStorage.getItem('mode') || 'dark';
if (savedMode === 'light') {
    body.classList.add('light-mode');
    modeIcon.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    modeIcon.innerHTML = '<i class="fas fa-moon"></i>';
}

modeToggle.addEventListener('click', () => {
    playClickSound();
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    modeIcon.innerHTML = isLightMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('mode', isLightMode ? 'light' : 'dark');
});
