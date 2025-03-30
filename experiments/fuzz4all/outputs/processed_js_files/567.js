 

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`GET: ${prop}`);
            return target[prop];
        } else {
            print(`Property ${prop} does not exist.`);
        }
    },
    set: (target, prop, value) => {
        print(`SET: ${prop} = ${value}`);
        target[prop] = value;
        return true;
    }
};

 
let obj = new Proxy({ a: 1, b: 2 }, handler);

 
function* objGenerator(o) {
    for (const key in o) {
        yield `${key}: ${o[key]}`;
    }
}

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Data loaded'), 1000);
    });
}

 
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? `<strong>${values[i]}</strong>` : '';
        return result + string + value;
    }, '');
}

 
(async function main() {
    obj.a = 42;  
    print(obj.a);  

    print('\n--- Generator Output ---');
    const gen = objGenerator(obj);
    for (let value of gen) {
        print(value);
    }

    print('\n--- Async/Await Operation ---');
    const data = await fetchData();
    print(data);

    print('\n--- Tagged Template Literal ---');
    const user = 'Alice', action = 'logged in';
    print(highlight`${user} has ${action}`);
})();
