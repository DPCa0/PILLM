class DataManager {
    #data = new Map();
    
    constructor() {
        this.#data = new Proxy(this.#data, {
            get: (target, prop) => {
                if (prop in target) {
                    return target[prop];
                }
                console.warn(`Property '${prop}' doesn't exist on target object.`);
                return false;
            },
            set: (target, prop, value) => {
                if (typeof value === 'function') {
                    console.error('Functions are not allowed as values!');
                    return false;
                }
                target[prop] = value;
                return true;
            }
        });
    }

    addData(key, value) {
        if (this.#data[key]) {
            console.error(`Duplicate key detected: '${key}'`);
        } else {
            this.#data[key] = value;
        }
    }

    getData(key) {
        return this.#data[key];
    }

    async processAsyncData(fetchFunction) {
        try {
            const data = await fetchFunction();
            this.addData('asyncData', data);
        } catch (error) {
            console.error('Error in processing async data:', error);
        }
    }
}

// Usage of DataManager class
const fetchData = async () => {
    const response = await new Promise(resolve => setTimeout(() => resolve({ info: 'Sample Data' }), 1000));
    return response;
};

const manager = new DataManager();
manager.addData('name', 'John Doe');
print(manager.getData('name'));

manager.processAsyncData(fetchData).then(() => {
    print(manager.getData('asyncData'));
});

manager.addData('func', () => {}); // Error: Functions are not allowed as values!
manager.addData('name', 'Jane Doe'); // Error: Duplicate key detected: 'name'
