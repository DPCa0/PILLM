 

 
const handler = {
    get: (target, property) => {
        print(`Property '${property}' accessed`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Property '${property}' set to '${value}'`);
        target[property] = value;
        return true;
    }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
async function getUserInfo() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(`User: ${user.name}, Age: ${user.age}`), 1000);
    });

    return await promise;
}

 
function* userActivity() {
    yield 'Browsing the site';
    yield 'Adding items to cart';
    yield 'Checking out';
}

 
(async () => {
    print(await getUserInfo());
    user.name = 'Bob';
    user.age = 35;
    print(await getUserInfo());

    const activity = userActivity();
    for (const act of activity) {
        print(`User Activity: ${act}`);
    }
})();
