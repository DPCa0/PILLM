 
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        [a, b] = [b, a + b];
        yield a;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing element ${prop}`);
            return target[prop];
        } else {
            print(`Property ${prop} not found`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        print(`Setting element ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const observedArray = new Proxy([], handler);

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print('Data fetched:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
(async () => {
     
    const fibGen = fibonacci();
    for (let i = 0; i < 10; i++) {
        observedArray[i] = fibGen.next().value;
    }

     
    print(observedArray[3]);
    print(observedArray[10]);

     
    await fetchData('https://jsonplaceholder.typicode.com/posts/1');
})();
