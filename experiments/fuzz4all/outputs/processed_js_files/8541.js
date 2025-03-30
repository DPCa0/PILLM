 
async function complexFeatureDemo() {
    const data = await fetchData();

    const filteredData = data.filter(({ age }) => age > 18);

    const doubledAges = filteredData.map(({ name, age }) => ({ name, age: age * 2 }));

    const [first, second, ...rest] = doubledAges;

    print('First:', first);
    print('Second:', second);
    print('Rest:', rest);

    const proxyHandler = {
        get(target, prop, receiver) {
            print(`Accessing property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        }
    };

    const proxyData = new Proxy(doubledAges, proxyHandler);

    for (const item of dataGenerator(proxyData)) {
        print(item);
    }
}

function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Alice', age: 22 },
                { name: 'Bob', age: 17 },
                { name: 'Charlie', age: 23 },
                { name: 'Dave', age: 19 }
            ]);
        }, 1000);
    });
}

function* dataGenerator(dataArray) {
    for (const item of dataArray) {
        yield item;
    }
}

complexFeatureDemo();
