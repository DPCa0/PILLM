(async function() {
    const data = [1, 2, 3, 4, 5];
    
     
    const handler = {
        get: (target, prop) => {
            if (prop in target) {
                print(`Accessing index ${prop}: ${target[prop]}`);
                return target[prop];
            }
            return undefined;
        }
    };
    
    const proxiedData = new Proxy(data, handler);

     
    const doubleMap = new Map(data.map(n => [n, n * 2]));
    const uniqueSet = new Set(data);
    const wm = new WeakMap();
    const obj = {};
    wm.set(obj, 'privateValue');

     
    async function* asyncDoubler(array) {
        for (let num of array) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield num * 2;
        }
    }

     
    function getOptionalValue(obj, path) {
        return path.reduce((acc, key) => acc?.[key], obj) ?? 'default';
    }

    print('Using Proxy:');
    print(proxiedData[2]);

    print('\nUsing Map:');
    doubleMap.forEach((value, key) => print(`Double of ${key} is ${value}`));

    print('\nUsing Set:');
    print('Unique values:', uniqueSet);

    print('\nUsing WeakMap:');
    print('WeakMap value:', wm.get(obj));

    print('\nUsing async generator:');
    for await (const val of asyncDoubler(data)) {
        print(val);
    }

    print('\nUsing Optional Chaining and Nullish Coalescing:');
    const nestedObject = { a: { b: { c: 42 } } };
    print(getOptionalValue(nestedObject, ['a', 'b', 'c']));  
    print(getOptionalValue(nestedObject, ['a', 'x', 'y']));  
})();
