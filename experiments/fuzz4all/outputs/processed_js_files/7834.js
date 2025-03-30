 
async function* asyncGenerator() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 0; i < 3; i++) {
        await delay(1000);  
        yield `Yielded value ${i}`;
    }
}

(async function() {
    try {
        const results = [];
        for await (let value of asyncGenerator()) {
            print(value);
            results.push(value);
        }
        
         
        const [first, ...rest] = results;
        print(`First: ${first}`);
        print(`Rest: ${rest}`);
        
         
        const map = new Map();
        const set = new Set();
        const uniqueKey = Symbol('uniqueKey');
        
        map.set(uniqueKey, { message: 'Hello, unique world!' });
        set.add(map.get(uniqueKey));
        
        print(set.has(map.get(uniqueKey)) ? set.values().next().value.message : 'Not found');
    } catch (error) {
        console.error('Error:', error);
    }
})();
