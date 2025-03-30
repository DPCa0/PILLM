 

function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

const numberProxyHandler = {
    get(target, prop) {
        if (prop === 'nextValue') {
            return target().next().value;
        }
        return target[prop];
    }
};

const proxiedGenerator = new Proxy(numberGenerator, numberProxyHandler);

const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Fetched Data");
        }, 1000);
    });
};

(async () => {
    try {
        print(`Starting Value: ${proxiedGenerator.nextValue}`);
        const data = await fetchData();
        print(data);
        print(`Next Value: ${proxiedGenerator.nextValue}`);
    } catch (error) {
        console.error("Error:", error);
    }
})();
