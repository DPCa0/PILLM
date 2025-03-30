 
class ComplexJS {
    constructor() {
        this.data = new Proxy({}, this.handler());
    }
    
    handler() {
        return {
            get: (target, prop) => {
                if (prop in target) {
                    print(`Getting property "${prop}" with value:`, target[prop]);
                    return target[prop];
                } else {
                    console.warn(`Property "${prop}" does not exist`);
                    return undefined;
                }
            },
            set: (target, prop, value) => {
                print(`Setting property "${prop}" to value:`, value);
                target[prop] = value;
                return true;
            }
        };
    }
    
    async fetchData(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async manipulateData(url) {
        const data = await this.fetchData(url);
        if (data) {
            Reflect.set(this.data, 'fetchedData', data);
            return this.data.fetchedData;
        }
    }
}

 
(async () => {
    const jsExample = new ComplexJS();
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    
    const result = await jsExample.manipulateData(url);
    print('Manipulated Data:', result);

     
    print(jsExample.data.nonExistent);
})();
