 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const retry = async (fn, retries = 3, delayMs = 1000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            if (attempt < retries) {
                print(`Attempt ${attempt} failed. Retrying...`);
                await delay(delayMs);
            } else {
                throw new Error(`Failed after ${retries} attempts.`);
            }
        }
    }
};

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const uniqueId = idGenerator();

 
const loggingProxy = (target) => new Proxy(target, {
    get(obj, prop) {
        print(`Accessing ${String(prop)}`);
        return Reflect.get(obj, prop);
    }
});

 
const fetchData = async () => {
    if (Math.random() > 0.7) {
        return { data: "Success", id: uniqueId.next().value };
    }
    throw new Error('Fetch failed');
};

 
const user = loggingProxy({
    name: "Alice",
    age: 30
});

 
const main = async () => {
    try {
        const result = await retry(fetchData);
        print('Fetch Result:', result);
    } catch (error) {
        console.error(error.message);
    }

    print('User Name:', user.name);
    print('User Age:', user.age);
};

main();
