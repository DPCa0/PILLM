 
function formatMessage(strings, ...values) {
    return strings.reduce((result, str, i) => {
        let value = values[i - 1];
        if (Array.isArray(value)) {
            value = value.join(', ');
        } else if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        return result + value + str;
    });
}

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(formatMessage`Data fetched successfully: ${data}`);
        return data;
    } catch (error) {
        console.error(formatMessage`Fetching data failed: ${error.message}`);
        throw error;
    }
}

 
const user = {
    name: 'Alice',
    age: 30,
    hobbies: ['Reading', 'Gardening']
};

const userProxy = new Proxy(user, {
    get(target, property, receiver) {
        print(`Accessing property: ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting property: ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
});

 
(async () => {
    userProxy.name;   
    userProxy.age = 31;   
    await fetchData('https://jsonplaceholder.typicode.com/todos/1');
})();
