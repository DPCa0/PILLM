class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    *movement() {
        const directions = ['up', 'down', 'left', 'right'];
        while (true) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            yield direction;
        }
    }

    move() {
        const direction = this.movement().next().value;
        switch (direction) {
            case 'up': this.y++; break;
            case 'down': this.y--; break;
            case 'left': this.x--; break;
            case 'right': this.x++; break;
        }
        print(`Moved ${direction}: (${this.x}, ${this.y})`);
    }
}

const simulate = async (particle, steps) => {
    for (let i = 0; i < steps; i++) {
        particle.move();
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

(async () => {
    const p = new Particle(0, 0);
    await simulate(p, 10);
})();
