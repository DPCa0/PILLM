 

const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([1, 2, 3, 4, 5]);
        }, 1000);
    });
};

const asyncGenerator = async function* () {
    const data = await fetchData();
    for (const item of data) {
        yield item * 2;
    }
};

(async () => {
    try {
        const iter = asyncGenerator();
        const results = [];

        for await (const num of iter) {
            results.push(num);
        }

        const [first, second, ...rest] = results;
        print('First:', first);  
        print('Second:', second);  
        print('Rest:', ...rest);  
    } catch (error) {
        console.error('Error:', error);
    }
})();
