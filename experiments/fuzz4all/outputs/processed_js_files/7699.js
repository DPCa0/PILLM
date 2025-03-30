class Particle {
    constructor(x, y) {
        this.position = { x, y };
    }

    *move(velocity) {
        for (let t = 0; t < 10; t++) {
            this.position.x += velocity.x;
            this.position.y += velocity.y;
            yield this.position;
        }
    }
}

async function simulate() {
    const particle = new Particle(0, 0);
    const velocity = { x: 1, y: 1 };
    const moveGenerator = particle.move(velocity);

    for await (const pos of moveGenerator) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        print(`Particle at: x=${pos.x}, y=${pos.y}`);
    }
}

 
const handler = {
    get(target, prop) {
        print(`Accessing property "${prop}"`);
        return target[prop];
    }
};

const proxiedParticle = new Proxy(new Particle(5, 5), handler);
simulate();
print(`Initial position: x=${proxiedParticle.position.x}, y=${proxiedParticle.position.y}`);
