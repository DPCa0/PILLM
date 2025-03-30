 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* generateData() {
    for (let i = 1; i <= 5; i++) {
        await sleep(500);
        yield { id: i, value: Math.random() * 100 };
    }
}

function createDataHandler() {
    const handler = {
        get(target, prop) {
            if (prop in target) {
                print(`Accessing ${prop}:`, target[prop]);
                return target[prop];
            } else {
                console.warn(`${prop} is not a property of the target.`);
                return undefined;
            }
        }
    };
    return new Proxy({}, handler);
}

async function processData() {
    const dataHandler = createDataHandler();
    for await (let { id, value } of generateData()) {
        ({ id, value } = { id, value: value.toFixed(2) });  
        dataHandler[id] = value;  
    }
}

processData();
