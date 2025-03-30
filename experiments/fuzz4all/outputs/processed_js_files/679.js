class Vector {
    constructor(...components) {
        this.components = components;
    }

    *[Symbol.iterator]() {
        yield* this.components;
    }

    static from(obj) {
        if (obj instanceof Vector) return obj;
        if (Symbol.iterator in Object(obj)) {
            return new Vector(...obj);
        }
        throw new TypeError("Object is not iterable");
    }

    map(fn) {
        return new Vector(...this.components.map(fn));
    }

    reduce(fn, initial) {
        return this.components.reduce(fn, initial);
    }

    toString() {
        return `Vector(${this.components.join(', ')})`;
    }
}

const addVectors = (...vectors) => {
    return vectors.reduce((acc, vec) => {
        vec = Vector.from(vec);
        return acc.map((value, index) => value + vec.components[index]);
    }, new Vector(...Array(vectors[0].length).fill(0)));
};

(async () => {
    const vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(4, 5, 6);
    const vec3 = new Vector(7, 8, 9);
    
     
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    await delay(1000);

    const sumVec = addVectors(vec1, vec2, vec3);
    print(`Sum of vectors: ${sumVec}`);

    const doubleVec = vec1.map(x => x * 2);
    print(`Doubled vector: ${doubleVec}`);
    
    const totalSum = vec1.reduce((acc, x) => acc + x, 0);
    print(`Sum of components in vec1: ${totalSum}`);
})();
