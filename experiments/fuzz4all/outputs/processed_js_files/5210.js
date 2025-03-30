 
class AdvancedFeaturesDemo {
    constructor() {
        this.state = new Proxy({ data: [] }, {
            set: (target, prop, value) => {
                if (prop === 'data' && Array.isArray(value)) {
                    print(`Data updated: ${value}`);
                }
                target[prop] = value;
                return true;
            }
        });
    }

    async fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(['apple', 'banana', 'cherry']);
            }, 1000);
        });
    }

    async init() {
        try {
            const data = await this.fetchData();
            Reflect.set(this.state, 'data', data);

             
            const capitalizedData = this.state.data.map(item => item.toUpperCase());
            print('Capitalized Data:', capitalizedData);

             
            const uniqueFruits = new Set([...capitalizedData, 'BANANA']);
            print('Unique Fruits:', uniqueFruits);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

const demo = new AdvancedFeaturesDemo();
demo.init();
