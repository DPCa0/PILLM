class Vector {
    constructor(...components) {
        this.components = components;
    }

    add(other) {
        return new Vector(...this.components.map((c, i) => c + other.components[i]));
    }

    scale(scalar) {
        return new Vector(...this.components.map(c => c * scalar));
    }

    toString() {
        return `Vector(${this.components.join(', ')})`;
    }
}

function* range(start, end, step = 1) {
    for (let i = start; i <= end; i += step) {
        yield i;
    }
}

const asyncDouble = async (num) => {
    return new Promise(resolve => setTimeout(() => resolve(num * 2), 100));
};

(async () => {
    const vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(4, 5, 6);
    const vec3 = vec1.add(vec2).scale(2);
    
    print(vec1.toString());
    print(vec2.toString());
    print(vec3.toString());

    for (const i of range(1, 5)) {
        print(`Value: ${i}`);
    }

    const doubledValues = await Promise.all([1, 2, 3, 4, 5].map(asyncDouble));
    print('Doubled Values:', doubledValues);
})();
