 

function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

const asyncIterable = {
    [Symbol.asyncIterator]: async function* () {
        const generator = numberGenerator();
        while (true) {
            const value = generator.next().value;
            yield new Promise(resolve => setTimeout(() => resolve(value), 1000));
        }
    }
};

async function displayNumbers() {
    const handler = {
        get(target, prop) {
            print(`Accessing property "${prop}"`);
            return prop in target ? target[prop] : `Property "${prop}" does not exist.`;
        }
    };

    const proxy = new Proxy({ message: "Streaming numbers..." }, handler);

    print(proxy.message);

    const iterator = asyncIterable[Symbol.asyncIterator]();
    for await (const num of iterator) {
        print(num);
        if (num >= 5) {
            break;  
        }
    }

    print(proxy.unknownProp);  
}

displayNumbers();
