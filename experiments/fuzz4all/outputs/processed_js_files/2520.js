 
import { promises as fs } from 'fs';
import readline from 'readline';

 
class DataProcessor {
    #data;
    
    constructor() {
        this.#data = [];
    }

    async #readData() {
        try {
            const data = await fs.readFile('data.txt', 'utf8');
            this.#data = data.split('\n').map(line => line.trim()).filter(Boolean);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }

    async #processData() {
        return this.#data.map(line => line.toUpperCase());
    }

    async run() {
        await this.#readData();
        const processedData = await this.#processData();
        print('Processed Data:', processedData);
    }
}

 
(async function main() {
    const processor = new DataProcessor();
    await processor.run();
    
     
    function* numberGenerator() {
        let num = 0;
        while (true) {
            yield num++;
        }
    }

    const gen = numberGenerator();
    print('First 5 numbers from generator:');
    for (let i = 0; i < 5; i++) {
        print(gen.next().value);
    }

     
    const handler = {
        get(target, prop) {
            print(`Accessing property ${prop}`);
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            print(`Setting property ${prop} to ${value}`);
            return Reflect.set(target, prop, value);
        }
    };

    const obj = new Proxy({ name: 'Advanced JS' }, handler);
    print(obj.name);
    obj.name = 'JavaScript Rocks!';
    print(obj.name);
})();
Note: This program assumes there is a `data.txt` file with some content in the same directory.