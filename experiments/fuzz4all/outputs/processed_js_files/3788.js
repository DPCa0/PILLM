 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
const multiplier = (x) => (y) => x * y;

 
const manipulateNumbers = (first, ...rest) => {
    let [min, max] = [Math.min(...rest), Math.max(...rest)];
    return { first, rest, min, max };
};

 
class Utility {
    static #privateValue = 42;

    static getPrivateValue() {
        return Utility.#privateValue;
    }
}

 
const loggingHandler = {
    get: (target, property, receiver) => {
        print(`Accessed ${String(property)}`);
        return Reflect.get(target, property, receiver);
    },
};

const createLoggingObject = (obj) => new Proxy(obj, loggingHandler);

 
(async () => {
    const apiData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('API Data:', apiData);

    const double = multiplier(2);
    print('Double 5:', double(5));

    const numberData = manipulateNumbers(1, 2, 3, 4, 5);
    print('Number Data:', numberData);

    print('Utility Private Value:', Utility.getPrivateValue());

    const person = createLoggingObject({ name: 'Alice', age: 30 });
    print('Person Name:', person.name);
    print('Person Age:', person.age);
})();
