 

 
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

 
function* numberGenerator(start = 0) {
    let num = start;
    while (true) {
        yield num++;
    }
}

 
const loggerProxyHandler = {
    get(target, property) {
        print(`Accessing property "${property}"`);
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Setting property "${property}" to "${value}"`);
        return Reflect.set(target, property, value);
    }
};

 
const obj = new Proxy({}, loggerProxyHandler);

 
const gen = numberGenerator();

 
obj.name = "Advanced JavaScript";
print(obj.name);

 
(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        print(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

 
for (let i = 0; i < 5; i++) {
    print(gen.next().value);
}
