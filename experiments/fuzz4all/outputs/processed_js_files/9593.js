 
const target = { value: 42 };
const handler = {
    get: (obj, prop) => {
        if (prop === 'value') {
            print('Accessed value');
            return Reflect.get(obj, prop) + 10;
        }
        return Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
        if (prop === 'value') {
            print('Modified value');
            return Reflect.set(obj, prop, value * 2);
        }
        return Reflect.set(obj, prop, value);
    }
};

const proxy = new Proxy(target, handler);

 
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1] ? `<strong>${values[i - 1]}</strong>` : '';
        return result + value + str;
    });
}

const name = 'world';
print(highlight`Hello, ${name}!`);

 
async function* asyncGenerator() {
    let i = 0;
    while (i < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i++;
    }
}

(async () => {
    for await (let num of asyncGenerator()) {
        print(`Number: ${num}`);
    }
})();

 
print(`Proxy Value: ${proxy.value}`);  
proxy.value = 100;  
print(`Modified Proxy Value: ${proxy.value}`);  
