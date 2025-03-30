const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const processData = (data) => {
    const transformedData = data.map(({ id, name }) => ({
        [Symbol.for(`ID-${id}`)]: id,
        name: name.toUpperCase()
    }));
    return transformedData;
};

const main = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const data = await fetchData(url);
    if (data) {
        const processed = processData(data);
        processed.forEach(user => {
            for (const [key, value] of Object.entries(user)) {
                print(`${String(key)}: ${value}`);
            }
        });
    }
};

main();

 
const originalUser = { firstName: 'John', lastName: 'Doe', age: 30 };
const userProxy = new Proxy(originalUser, {
    get(target, property) {
        if (property === 'fullName') {
            return `${target.firstName} ${target.lastName}`;
        }
        return target[property];
    },
    set(target, property, value) {
        if (property === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        target[property] = value;
        return true;
    }
});

print(userProxy.fullName);
try {
    userProxy.age = 'thirty';
} catch (e) {
    console.error(e.message);
}
userProxy.age = 31;
print(userProxy.age);
