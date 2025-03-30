 
const handler = {
    get(target, prop) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const original = { a: 1, b: 2 };
const observed = new Proxy(original, handler);

 
async function fetchData() {
     
    return new Promise(resolve => setTimeout(() => resolve({ data: 'Fetched data' }), 1000));
}

 
(async () => {
    const data = await fetchData();
    print(data);

     
    print(data?.data ?? 'No data available');

     
    const { a, ...rest } = observed;
    print('Destructured:', a, rest);

     
    observed.c = 3;

     
    function highlight(strings, ...values) {
        return strings.reduce((acc, str, i) => `${acc}<strong>${values[i - 1] || ''}</strong>${str}`);
    }

    const name = 'World';
    print(highlight`Hello, ${name}!`);

     
    function* generator() {
        yield 1;
        yield 2;
        yield 3;
    }

    for (let value of generator()) {
        print('Generator value:', value);
    }
})();
