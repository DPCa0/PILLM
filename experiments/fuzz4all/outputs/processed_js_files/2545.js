 

class AsyncProcessor {
    constructor() {
        this.data = [1, 2, 3, 4, 5];
    }

    async fetchData(index) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (index < this.data.length) {
                    resolve(this.data[index]);
                } else {
                    reject("Index out of bounds");
                }
            }, 1000);
        });
    }
}

const handler = {
    get: async function(target, prop, receiver) {
        if (prop in target) {
            try {
                const result = await target[prop];
                return `Result: ${result}`;
            } catch (error) {
                return `Error: ${error}`;
            }
        } else {
            return `Property ${prop} not found`;
        }
    }
};

(async () => {
    const processor = new AsyncProcessor();
    const proxy = new Proxy(processor, handler);

    for (let i = 0; i < 7; i++) {
        print(await proxy.fetchData(i));
    }
})();
