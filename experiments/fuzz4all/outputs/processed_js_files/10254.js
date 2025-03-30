 
function asyncOperation(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value % 2 === 0) {
                resolve(`Resolved: ${value} is even.`);
            } else {
                reject(`Rejected: ${value} is odd.`);
            }
        }, 1000);
    });
}

 
async function processValues(values) {
    for (let value of values) {
        try {
            const result = await asyncOperation(value);
            print(result);
        } catch (error) {
            console.error(error);
        }
    }
}

 
const handler = {
    get(target, property) {
        print(`Accessing property '${property}'`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

const obj = new Proxy({ a: 1, b: 2, c: 3 }, handler);

 
(async () => {
    obj.a;        
    obj.b = 20;   
    print(obj);

     
    const { a, ...rest } = obj;
    print(`Destructured a: ${a}, rest:`, rest);

     
    await processValues([1, 2, 3, 4]);
})();
