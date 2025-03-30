 

 
class AdvancedDemo {
    constructor(data) {
        this.data = data;
    }

    async fetchData() {
         
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.data) {
                    resolve(`Fetched data: ${this.data}`);
                } else {
                    reject("No data available");
                }
            }, 1000);
        });
    }

    static processData(input) {
         
        const manipulated = Reflect.set(input, 'status', 'processed');
        return manipulated ? input : null;
    }
}

 
const handler = {
    get: (target, property, receiver) => {
        print(`Accessing property '${property}'`);
        return Reflect.get(target, property, receiver);
    },
    set: (target, property, value, receiver) => {
        print(`Setting property '${property}' to '${value}'`);
        return Reflect.set(target, property, value, receiver);
    }
};

 
(async () => {
    const proxyDemo = new Proxy(new AdvancedDemo("Hello, advanced JavaScript!"), handler);
    
    try {
        const result = await proxyDemo.fetchData();
        print(result);

        const newData = { message: "Initial message" };
        const processedData = AdvancedDemo.processData(newData);
        print('Processed data:', processedData);

    } catch (error) {
        console.error(error);
    }
})();
