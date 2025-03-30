class Vector {
    constructor(...components) {
        this.components = components;
    }

    *[Symbol.iterator]() {
        for (const component of this.components) {
            yield component;
        }
    }

    static dotProduct(v1, v2) {
        if (v1.components.length !== v2.components.length) {
            throw new Error("Vectors must have the same dimensions.");
        }
        return v1.components.reduce((acc, c, i) => acc + c * v2.components[i], 0);
    }

    get magnitude() {
        return Math.sqrt(this.components.reduce((acc, c) => acc + c ** 2, 0));
    }

    async transform(callback) {
        this.components = await Promise.all(this.components.map(callback));
        return this;
    }
}

async function main() {
    const vectorA = new Vector(1, 2, 3);
    const vectorB = new Vector(4, 5, 6);

    print(`Vector A: [${[...vectorA]}]`);
    print(`Vector B: [${[...vectorB]}]`);

    const dot = Vector.dotProduct(vectorA, vectorB);
    print(`Dot product: ${dot}`);

    print(`Magnitude of A: ${vectorA.magnitude.toFixed(2)}`);
    print(`Magnitude of B: ${vectorB.magnitude.toFixed(2)}`);

     
    await vectorA.transform(async c => c * 2);
    print(`Transformed Vector A: [${[...vectorA]}]`);
}

main().catch(console.error);
