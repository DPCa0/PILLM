class Particle {
    constructor(x, y, speed, direction) {
        Object.assign(this, { x, y, speed, direction });
    }

    move() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
    }

    static createRandomParticle() {
        const speed = Math.random() * 5;
        const direction = Math.random() * Math.PI * 2;
        const x = Math.random() * 500;
        const y = Math.random() * 500;
        return new this(x, y, speed, direction);
    }
}

function* particleGenerator(count) {
    while (count--) {
        yield Particle.createRandomParticle();
    }
}

const simulateParticles = async (particles) => {
    const movePromises = particles.map(p => {
        return new Promise(resolve => {
            setTimeout(() => {
                p.move();
                resolve(`Particle moved to (${p.x.toFixed(2)}, ${p.y.toFixed(2)})`);
            }, 1000);
        });
    });
    const results = await Promise.all(movePromises);
    print(results.join('\n'));
};

const main = async () => {
    const particles = Array.from(particleGenerator(5));
    await simulateParticles(particles);
};

main().catch(err => console.error(err));
