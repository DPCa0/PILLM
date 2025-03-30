class DataStream {
    constructor(generatorFunc) {
        this.generatorFunc = generatorFunc;
    }
    
    async *[Symbol.asyncIterator]() {
        const generator = this.generatorFunc();
        let result = await generator.next();
        while (!result.done) {
            yield result.value;
            result = await generator.next();
        }
    }
}

async function* numberGenerator() {
    for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        yield i;
    }
}

async function run() {
    const dataStream = new DataStream(numberGenerator);

    for await (const value of dataStream) {
        print(`Received: ${value}`);
    }
    
    print("Finished processing the data stream.");
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const log = debounce((message) => print(message), 1000);

document.addEventListener('mousemove', () => log("Mouse moved"));

run();
