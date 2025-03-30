 
async function* asyncNumberGenerator(limit) {
    for (let i = 0; i <= limit; i++) {
         
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

 
const createCustomObject = () => {
    return new Proxy({}, {
        get: function(target, prop, receiver) {
            if (!(prop in target)) {
                print(`Property "${prop}" doesn't exist. Creating new property.`);
                target[prop] = `default-${prop}`;
            }
            return Reflect.get(...arguments);
        },
        set: function(target, prop, value, receiver) {
            print(`Setting property "${prop}" to "${value}"`);
            return Reflect.set(...arguments);
        }
    });
};

// Using tagged template literals for custom string processing
function tag(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? values[i].toUpperCase() : '');
    }, '');
}

(async () => {
    // Using async iterators with for-await-of
    print("Async Number Generator:");
    for await (const num of asyncNumberGenerator(5)) {
        print(num);
    }

    // Using Proxy
    const obj = createCustomObject();
    print("\nProxy Example:");
    print(obj.someProperty);
    obj.someProperty = "newValue";
    print(obj.someProperty);

    // Using tagged template literals
    print("\nTagged Template Literal:");
    const name = 'world';
    print(tag`Hello, ${name}!`);
})();
