 

 
import { readFile } from 'fs/promises';

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'apple', 'orange']);
        }, 1000);
    });
};

 
class FruitProcessor {
    constructor(data) {
        this.data = data;
    }

    getUniqueFruits() {
         
        return [...new Set(this.data)];
    }

    countFruits() {
        const fruitMap = new Map();
        this.data.forEach((fruit) => {
            fruitMap.set(fruit, (fruitMap.get(fruit) || 0) + 1);
        });
        return fruitMap;
    }
}

 
async function main() {
     
    const fruits = await fetchData();
    const fruitProcessor = new FruitProcessor(fruits);

     
    print('Unique Fruits:', fruitProcessor.getUniqueFruits());
    print('Fruit Counts:', fruitProcessor.countFruits());

     
    try {
        const data = await readFile('example.txt', 'utf8');
        print('File Content:', data);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

 
main();
