 
const data = new Map();
data.set('fruits', new Set(['apple', 'banana', 'mango']));
data.set('vegetables', new Set(['carrot', 'broccoli', 'spinach']));

 
async function fetchData(category) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.has(category)) {
                resolve(data.get(category));
            } else {
                reject(`No data found for category: ${category}`);
            }
        }, 1000);
    });
}

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return obj[prop];
        } else {
            console.warn(`Property ${prop} does not exist.`);
        }
    }
};

const preferences = new Proxy({ category: 'fruits', limit: 2 }, handler);

 
(async () => {
    try {
        const items = await fetchData(preferences.category);
        const limitedItems = Array.from(items).slice(0, preferences.limit);
        
         
        for (const item of limitedItems) {
            print(`Enjoy your ${item}!`);
        }
    } catch (error) {
        console.error(error);
    }
})();
