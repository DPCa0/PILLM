class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static fromArray(arr) {
        const [x, y, z] = arr;
        return new Vector(x, y, z);
    }

    *[Symbol.iterator]() {
        yield* [this.x, this.y, this.z];
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    dotProduct(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    async scale(factor) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(new Vector(this.x * factor, this.y * factor, this.z * factor));
            }, 1000);
        });
    }

    toString() {
        return `Vector(${this.x}, ${this.y}, ${this.z})`;
    }
}

const main = async () => {
    const v1 = Vector.fromArray([1, 2, 3]);
    const v2 = new Vector(4, 5, 6);
    print(`v1: ${v1}`);
    print(`v2: ${v2}`);

    print(`Magnitude of v1: ${v1.magnitude()}`);
    print(`Dot product of v1 and v2: ${v1.dotProduct(v2)}`);

    const scaledV1 = await v1.scale(2);
    print(`Scaled v1 by 2: ${scaledV1}`);

    const arr = [...scaledV1];
    print(`Array from scaledV1: ${arr}`);
};

main();
