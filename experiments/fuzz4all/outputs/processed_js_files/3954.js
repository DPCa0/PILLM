 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('No URL provided');
            }
        }, 1000);
    });
}

 
const handler = {
    get: function(target, property, receiver) {
        if (property in target) {
            return target[property];
        } else {
            print(`Property "${property}" does not exist on the target object`);
            return undefined;
        }
    },
    set: function(target, property, value, receiver) {
        print(`Setting value of "${property}" to "${value}"`);
        target[property] = value;
        return true;
    }
};

const targetObject = {};
const proxy = new Proxy(targetObject, handler);

(async () => {
    try {
         
        const data = await fetchData('https://api.example.com/data');
        print(data);

         
        const person = { name: 'John', age: 30, city: 'New York' };
        const { name, age, city } = person;
        print(`Name: ${name}, Age: ${age}, City: ${city}`);

         
        print(`Hello, ${name} from ${city}`);

         
        proxy.name = 'Alice';  
        print(proxy.name);  
        print(proxy.nonExistentProp);  
    } catch (error) {
        console.error('Error:', error);
    }
})();
