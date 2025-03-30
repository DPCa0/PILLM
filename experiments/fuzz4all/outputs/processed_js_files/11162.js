 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const data = { name: "John", age: 30 };

 
const proxiedData = new Proxy(data, handler);

 
async function* asyncGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

 
(async () => {
     
    proxiedData.name = "Jane";
    print(proxiedData.age);

     
    const dataUrl = 'https://api.example.com/data';
    const fetchedData = await fetchData(dataUrl);
    print('Fetched Data:', fetchedData);

     
    for await (const num of asyncGenerator(5)) {
        print(`Async Generator value: ${num}`);
    }
})();
