 
const handler = {
    get(target, property) {
        print(`Accessing property '${property}'`);
        if (property in target) {
            return target[property];
        } else {
            return `Property '${property}' not found!`;
        }
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxyObject = new Proxy(targetObject, handler);

 
async function fetchData() {
     
    const fakeApiCall = new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
    });

    const result = await fakeApiCall;
    print(`Fetched data: ${result.data}`);
}

 
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = numberGenerator();
print('Generated Numbers:');
for (const number of generator) {
    print(number);
}

 
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

const numbersArray = [1, 2, 3, 4, 5];
print(`Sum of numbers: ${sum(...numbersArray)}`);

 
const user = {
    profile: {
        name: 'John Doe',
        address: null
    }
};

print(`User name: ${user?.profile?.name ?? 'Anonymous'}`);
print(`User address: ${user?.profile?.address ?? 'Address not provided'}`);

 
proxyObject.a;
proxyObject.b = 5;
print(`Non-existent property: ${proxyObject.nonExistentProp}`);

 
fetchData();
