 

function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (limit-- > 0) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

const reactiveHandler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property '${prop}' with value: ${target[prop]}`);
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Property '${prop}' does not exist`);
        }
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' with value: ${value}`);
        target[prop] = value;
        return true;
    }
};

async function main() {
    try {
        const data = await fetchData('https://api.example.com/data');
        print('Fetched Data:', data);

        const reactiveObject = new Proxy({ someProperty: 10 }, reactiveHandler);

        const fibSequence = fibonacci(10);
        print('Fibonacci Sequence:');
        for (let num of fibSequence) {
            print(num);
        }

        reactiveObject.someProperty = 42;
        print(reactiveObject.someProperty);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
