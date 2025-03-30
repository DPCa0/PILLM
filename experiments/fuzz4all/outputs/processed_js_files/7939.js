 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { user: 'John Doe', age: 30, location: 'Earth' };
            Math.random() > 0.1 ? resolve(data) : reject('Data fetch failed');
        }, 1000);
    });
}

 
function* processUserData(data) {
    yield `User: ${data.user}`;
    yield `Age: ${data.age}`;
    yield `Location: ${data.location}`;
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        }
        print(`Method ${prop} does not exist`);
    }
};

 
const userMethods = {
    greet: (name) => `Hello, ${name}!`,
    farewell: (name) => `Goodbye, ${name}!`
};

 
async function displayUserData() {
    try {
        const data = await fetchData();
        const iterator = processUserData(data);

        for (let info of iterator) {
            print(info);
        }

         
        const proxy = new Proxy(userMethods, handler);
        print(proxy.greet(data.user));
        print(proxy.unknownMethod('Should log error message'));
    } catch (error) {
        console.error(error);
    }
}

 
displayUserData();
