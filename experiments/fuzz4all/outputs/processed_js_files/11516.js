 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
function modifyFetch(fn) {
    return async function(url) {
        print(`Fetching data from: ${url}`);
        let data = await fn(url);
        if (data) {
            print(`Data received from ${url}`);
        }
        return data;
    };
}

 
let monitorHandler = {
    get: function(target, property, receiver) {
        print(`Accessing property "${property}"`);
        return Reflect.get(...arguments);
    },
    set: function(target, property, value, receiver) {
        print(`Setting property "${property}" to "${value}"`);
        return Reflect.set(...arguments);
    }
};

 
let monitoredObject = new Proxy({a: 1, b: 2}, monitorHandler);

 
let fetchDataWithLogging = modifyFetch(fetchData);

 
function* generateDataSequence(data) {
    for (let item of data) {
        yield item;
    }
}

 
(async () => {
     
    let data = await fetchDataWithLogging('https://jsonplaceholder.typicode.com/todos/1');

     
    monitoredObject.a = 42;
    print(`monitoredObject.a: ${monitoredObject.a}`);

    if (data) {
         
        let sequence = generateDataSequence([1, 2, 3, 4, 5]);
        for (let value of sequence) {
            print(`Generator value: ${value}`);
        }
    }
})();
