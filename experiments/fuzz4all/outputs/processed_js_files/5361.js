 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ user: { name: 'Alice', age: 30 }, data: [1, 2, 3, 4, 5] }), 1000);
    });
}

 
const handler = {
    get(target, property) {
        print(`Accessed property "${property}"`);
        return target[property];
    },
    set(target, property, value) {
        print(`Set property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    }
};

 
async function main() {
     
    const { user, data } = await fetchData();

     
    const proxyUser = new Proxy(user, handler);

     
    print(`User: ${proxyUser.name}, Age: ${proxyUser.age}`);
    proxyUser.age = 31;
    print(`Updated Age: ${proxyUser.age}`);

     
    const [first, second, , fourth, fifth, sixth = 6] = data;
    print(`Selected data: ${first}, ${second}, ${fourth}, ${fifth}, ${sixth}`);
}

main().catch(console.error);
