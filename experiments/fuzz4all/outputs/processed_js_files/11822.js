 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
};

 
function* dataProcessor(dataArray) {
    for (let data of dataArray) {
        yield data.toUpperCase();
    }
}

 
const apiData = {
    data1: 'value1',
    data2: 'value2',
    data3: 'value3',
};

const proxyHandler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}" with value: "${target[prop]}"`);
        return target[prop];
    },
};

const proxiedData = new Proxy(apiData, proxyHandler);

 
(async () => {
    try {
         
        const rawData1 = await fetchData('https://api.example.com/data1');
        const rawData2 = await fetchData('https://api.example.com/data2');

         
        const processedDataGen = dataProcessor([rawData1, rawData2]);
        const processedData = [];
        for (let data of processedDataGen) {
            processedData.push(data);
        }

         
        const accessedData = [proxiedData.data1, proxiedData.data2, proxiedData.data3];

         
        const finalOutput = processedData.map((data, index) => 
            `Processed Data ${index + 1}: ${data}, Proxied Value: ${accessedData[index]}`
        );

        print(finalOutput.join('\n'));
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
