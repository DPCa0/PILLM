 
class ComplexJS {
    constructor() {
        this.data = [];
    }

    async fetchData() {
         
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        let data = await response.json();
        this.data = data;
    }

    *dataGenerator() {
        for (const item of this.data) {
            yield item;
        }
    }

    processItems() {
        const generator = this.dataGenerator();
        const results = [];

        for (const item of generator) {
             
            const { id, title, body } = item;
            results.push({ id, title: title.toUpperCase(), summary: body.substring(0, 50) });
        }

        return results;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return target[prop];
        } else {
            throw new Error(`Property "${prop}" does not exist.`);
        }
    }
};

 
(async () => {
    let instance = new ComplexJS();
    instance = new Proxy(instance, handler);

    await instance.fetchData();
    print('Data fetched:', instance.data.length);

    const processed = instance.processItems();
    print('Processed items:', processed.slice(0, 5));
})();
