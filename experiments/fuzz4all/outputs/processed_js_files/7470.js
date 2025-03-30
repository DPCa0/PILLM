 
function* generatorExample() {
    yield 'First';
    yield 'Second';
    yield 'Third';
}

async function asyncOperation(value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Processed: ${value}`);
        }, 1000);
    });
}

async function runComplexAsync() {
    const gen = generatorExample();
    for (let value of gen) {
        print(`Yielded: ${value}`);
        const result = await asyncOperation(value);
        print(result);
    }

     
    const obj = { a: 1, b: 2, c: 3 };
    const { a, ...rest } = obj;
    print(`Extracted: a = ${a}, rest = `, rest);

     
    function tag(strings, ...values) {
        return strings.reduce((acc, str, i) => acc + str + (values[i] ? `[${values[i]}]` : ''), '');
    }
    const dynamicString = tag`Values: ${a}, ${rest.b}, and ${rest.c}`;
    print(dynamicString);

     
    const map = new Map();
    map.set('key1', 'value1').set('key2', 'value2');
    print(`Map value for 'key1': ${map.get('key1')}`);

    const set = new Set(['apple', 'banana', 'orange']);
    set.add('grape');
    print('Set has banana:', set.has('banana'));

     
    const handler = {
        get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} not found`)
    };
    const proxy = new Proxy({ msg: 'Hello, Proxy!' }, handler);
    print(proxy.msg);
    print(proxy.nonExistentProp);
}

runComplexAsync();
