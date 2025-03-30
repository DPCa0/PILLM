 
const data = {
    name: 'Alice',
    age: 30
};

const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            throw new Error(`Property ${prop} does not exist.`);
        }
    }
};

const proxiedData = new Proxy(data, handler);

 
(async () => {
    try {
        const { v4: uuidv4 } = await import('https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/esm-browser/index.js');
        print('Generated UUID:', uuidv4());

         
        print('Name:', proxiedData.name);
        print('Age:', proxiedData.age);
        print('Gender:', proxiedData.gender);   
    } catch (error) {
        console.error(error.message);
    }
})();

 
function* fibonacciGenerator(limit) {
    let [prev, current] = [0, 1];
    while (limit--) {
        [prev, current] = [current, prev + current];
        yield current;
    }
}

const fibIterator = fibonacciGenerator(5);
for (const num of fibIterator) {
    print('Fibonacci number:', num);
}
