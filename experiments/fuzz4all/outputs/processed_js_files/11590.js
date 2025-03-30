 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            if (url === 'https://api.example.com/data') {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
const dataHandler = {
    get(target, prop) {
        print(`Accessing property "${prop}"`);
        return target[prop];
    }
};

 
(async function main() {
    try {
        const response = await fetchData('https://api.example.com/data');
        const proxiedData = new Proxy(response.data, dataHandler);

         
        const [first, second, ...rest] = proxiedData;

        print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

         
        function* dataGenerator(dataArray) {
            for (let item of dataArray) {
                yield item;
            }
        }

        const dataIter = dataGenerator(proxiedData);
        for (const value of dataIter) {
            print(`Generated value: ${value}`);
        }

         
        const doubledData = proxiedData.map(x => x * 2).filter(x => x > 5);
        print(`Doubled Data (filtered): ${doubledData}`);

         
        const message = `Data processing complete. Processed ${proxiedData.length} items.`;
        print(message);

    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();
