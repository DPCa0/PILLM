 

const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
};

 
function* dataGenerator(dataArray) {
    for (const data of dataArray) {
        yield data;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Property "${prop}" accessed`);
        return Reflect.get(...arguments);
    },
    set: (target, prop, value) => {
        if (typeof value !== 'number' || value < 0) {
            throw new Error(`Invalid value "${value}" set for "${prop}". Must be a non-negative number.`);
        }
        print(`Property "${prop}" set to "${value}"`);
        return Reflect.set(...arguments);
    }
};

 
const validatedObject = new Proxy({ value: 0 }, handler);

 
(async () => {
    const dataArray = await fetchData('https://jsonplaceholder.typicode.com/todos');
    
    if (dataArray) {
        const generator = dataGenerator(dataArray);

        print('Iterating over fetched data with generator:');
        for (let i = 0; i < 5; i++) {
            print(generator.next().value);
        }
    }

     
    print('Proxy demonstration:');
    try {
        validatedObject.value = 42;  
        print(validatedObject.value);

        validatedObject.value = -10;  
    } catch (error) {
        console.error(error);
    }
})();
