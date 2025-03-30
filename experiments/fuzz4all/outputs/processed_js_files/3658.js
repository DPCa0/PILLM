class ComplexFeature {
    constructor(value) {
        this.value = value;
    }

    static async fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }

    *range(start, end) {
        while (start < end) {
            yield start++;
        }
    }

    async process() {
        try {
            const data = await ComplexFeature.fetchData('https://api.mocki.io/v2/549a5d8b');
            print(`Fetched data: ${JSON.stringify(data)}`);

            const proxy = new Proxy(this, {
                get(target, prop) {
                    if (prop === 'value') {
                        print(`Accessing value: ${target[prop]}`);
                    }
                    return target[prop];
                }
            });

            const doubledValues = [...proxy.range(0, 5)].map(num => num * 2);
            print(`Doubled Values: ${doubledValues}`);
            
            this.#privateMethod();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    #privateMethod() {
        print(`Private value: ${this.value}`);
    }
}

const complexInstance = new ComplexFeature(42);
complexInstance.process();
