 
async function complexFeatureShowcase() {
     
    const map = new Map([
        ['John', { age: 30, occupation: 'Developer' }],
        ['Jane', { age: 25, occupation: 'Designer' }]
    ]);

     
    const [firstEntry, ...restEntries] = [...map];
    const [name, { age, occupation }] = firstEntry;
    
    print(`First entry: ${name}, Age: ${age}, Occupation: ${occupation}`);
    
     
    const fetchPromises = [...map.keys()].map(async (person) => {
         
        const data = await new Promise((resolve) => setTimeout(() => resolve(`${person}'s data`), 1000));
        return data;
    });

    const results = await Promise.all(fetchPromises);
    print('Fetched data:', results);

    // Using a generator function
    function* generatorFunction() {
        for (let [name] of map) {
            yield name;
        }
    }

    const namesIterator = generatorFunction();
    print('Iterated names:', [...namesIterator]);

    // Using a Proxy to add validation to a simple object
    const target = { score: 0 };
    const handler = {
        set(obj, prop, value) {
            if (prop === 'score' && (typeof value !== 'number' || value < 0)) {
                throw new TypeError('Score must be a non-negative number');
            }
            obj[prop] = value;
            return true;
        }
    };

    const proxy = new Proxy(target, handler);
    proxy.score = 42;  // Valid operation
    print('Valid score set:', proxy.score);

    try {
        proxy.score = -1;   
    } catch (e) {
        console.error(e.message);
    }
}

 
complexFeatureShowcase();
