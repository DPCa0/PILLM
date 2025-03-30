 
import { promises as fs } from 'fs';
import { promisify } from 'util';

 
const _privateData = Symbol('privateData');

 
class AdvancedFeatureDemo {
    constructor(data) {
        this[_privateData] = data;
    }

     
    [_privateData]() {
        return [...this[_privateData]].reverse().join('');
    }

     
    async saveData(fileName) {
        try {
            const reversedData = this[_privateData]();
            await fs.writeFile(fileName, reversedData);
            print('Data saved successfully!');
        } catch (err) {
            console.error('Error saving data:', err);
        }
    }

     
    static async processData(strings, ...values) {
        const data = strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
        const reversedData = await new Promise((resolve) => {
            setTimeout(() => resolve([...data].reverse().join('')), 1000);
        });
        print('Processed Data:', reversedData);
    }
}

 
const handler = {
    get: function (target, prop, receiver) {
        if (prop === 'greet') {
            return function () {
                return `Hello, ${target[_privateData]}!`;
            };
        }
        return Reflect.get(...arguments);
    }
};

 
(async () => {
    const demo = new AdvancedFeatureDemo('AdvancedJavaScript');

     
    const proxyDemo = new Proxy(demo, handler);
    print(proxyDemo.greet());  

     
    await AdvancedFeatureDemo.processData`Learn advanced features in ${'JavaScript'}!`;

     
    await demo.saveData('advancedData.txt');
})();
