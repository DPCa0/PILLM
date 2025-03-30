 
async function complexFunction() {
    const fetchData = () => new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, value: 'A' },
                { id: 2, value: 'B' },
                { id: 3, value: 'C' },
                { id: 4, value: 'A' }
            ]);
        }, 1000);
    });

    const data = await fetchData();
    const uniqueValues = new Set(data.map(({ value }) => value));

    const result = Array.from(uniqueValues).reduce((acc, val, index) => ({
        ...acc,
        [val]: index + 1
    }), {});

    const proxyHandler = {
        get: (target, prop) => {
            if (prop in target) {
                return `Value: ${target[prop]}`;
            }
            return `Property ${prop} does not exist`;
        }
    };

    const proxiedResult = new Proxy(result, proxyHandler);

    print(proxiedResult['A']);  
    print(proxiedResult['B']);  
    print(proxiedResult['X']);  
}

complexFunction();
