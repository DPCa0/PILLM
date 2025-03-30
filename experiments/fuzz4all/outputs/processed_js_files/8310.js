 
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

 
const validator = {
    set: (obj, prop, value) => {
        if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
            throw new Error('Invalid age');
        }
        obj[prop] = value;
        return true;
    }
};

 
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

 
const add = x => y => x + y;

 
const processUser = user => {
    const { name, age } = user;
    return `User ${name} is ${age} years old.`;
};

 
(async function main() {
    const user = new Proxy({}, validator);

     
    const data = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    
     
    user.name = data.name;
    user.age = 25;

     
    const doubleAndIncrement = compose(add(1), x => x * 2);
    const result = doubleAndIncrement(user.age);

    print(processUser(user));  
    print(`The result of doubling and incrementing age is: ${result}`);  
})().catch(console.error);
