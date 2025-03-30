 

 
const fetchData = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
};

 
async function* asyncUrlFetcher(urls) {
    for (const url of urls) {
        const data = await fetchData(url);
        yield data;
    }
}

 
const symbolExample = () => {
    const uniqueSym = Symbol('unique');
    const data = {
        [uniqueSym]: 'This is unique data',
        publicData: 'This is public data'
    };

    const proxyHandler = {
        get: (target, prop) => {
            if (prop === uniqueSym) {
                return 'Access Denied';
            }
            return target[prop];
        }
    };

    const proxiedData = new Proxy(data, proxyHandler);
    print(proxiedData.publicData);
    print(proxiedData[uniqueSym]);
};

 
const main = async () => {
    const urls = ['http://example.com/1', 'http://example.com/2', 'http://example.com/3'];
    const urlFetcher = asyncUrlFetcher(urls);

    print('Fetching URL data:');
    for await (const data of urlFetcher) {
        print(data);
    }

    print('\nSymbol and Proxy example:');
    symbolExample();
};

 
main();
