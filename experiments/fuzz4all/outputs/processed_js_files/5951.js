 

 
const log = Symbol('log');

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop === log) {
            return Reflect.get(target, 'logger');
        }
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        if (prop === log) {
            return Reflect.set(target, 'logger', value);
        }
        return Reflect.set(target, prop, value, receiver);
    }
};

 
class Complex {
    constructor() {
        this.data = 'Initial data';
        this.logger = [];
        return new Proxy(this, handler);
    }

    async fetchData() {
         
        const fetchPromise = new Promise((resolve) => {
            setTimeout(() => resolve('Fetched data'), 2000);
        });
        this[log].push('Fetching data...');
        this.data = await fetchPromise;
        this[log].push('Data fetched');
    }

    printLog() {
        print('Log history:', this[log]);
    }
}

 
(async function() {
    const complexInstance = new Complex();
    print('Before fetching:', complexInstance.data);
    
    await complexInstance.fetchData();
    
    print('After fetching:', complexInstance.data);
    complexInstance.printLog();
})();
