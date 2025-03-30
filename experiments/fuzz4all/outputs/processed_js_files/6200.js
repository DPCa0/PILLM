 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'cherry']);
        }, 1000);
    });
}

 
function* itemGenerator(items) {
    for (const item of items) {
        yield item.toUpperCase();
    }
}

 
class FruitProcessor {
    constructor(dataFetcher) {
        this.dataFetcher = dataFetcher;
    }

    async processFruits() {
        try {
            const fruits = await this.dataFetcher();
            const fruitGen = itemGenerator(fruits);

            for (const fruit of fruitGen) {
                print(`Processing: ${fruit}`);
            }
        } catch (error) {
            console.error('Error processing fruits:', error);
        }
    }
}

 
const processor = new FruitProcessor(fetchData);
processor.processFruits();
