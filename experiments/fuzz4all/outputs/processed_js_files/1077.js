 
const arrayHandler = {
    get(target, prop) {
        if (prop === 'push') {
            return function(...args) {
                print(`Pushing ${args} to array`);
                return Reflect.apply(target[prop], target, args);
            };
        }
        return Reflect.get(target, prop);
    }
};

const trackedArray = new Proxy([], arrayHandler);

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const fibGen = fibonacci();
for (let i = 0; i < 10; i++) {
    trackedArray.push(fibGen.next().value);
}

 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(`Fetched data:`, data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
const PRIVATE_DATA = Symbol('privateData');
const secretHolder = {
    [PRIVATE_DATA]: "This is a secret"
};

const weakMap = new WeakMap();
weakMap.set(secretHolder, secretHolder[PRIVATE_DATA]);

const revealSecret = (obj) => {
    if (weakMap.has(obj)) {
        print('Revealed secret:', weakMap.get(obj));
    } else {
        print('No secret found!');
    }
};

 
(async () => {
    print('Tracked Array:', trackedArray);
    await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    revealSecret(secretHolder);
})();
