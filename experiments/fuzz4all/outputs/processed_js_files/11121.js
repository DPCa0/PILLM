 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    async fetchData() {
         
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.map(item => item * 2));
            }, 1000);
        });
    }
}

async function processData(data) {
    const processor = new DataProcessor(data);
    const processedData = await processor.fetchData();

    const sumData = processedData.reduce((acc, val) => acc + val, 0);
    return [processedData, sumData];
}

async function runApp() {
    const data = [1, 2, 3, 4, 5];
    const [processedData, sumData] = await processData(data);
    
    print(`Processed Data: ${processedData}`);
    print(`Sum of Data: ${sumData}`);

     
    const modifiedData = [...processedData, 12, 15];
    const [first, ...rest] = modifiedData;
    print(`Modified Data: [${first}, ${rest}]`);

     
    const [result1, result2] = await Promise.all([
        processor.fetchData(), 
        new Promise(res => setTimeout(() => res(42), 500))
    ]);
    print(`Simultaneous Results: ${result1}, ${result2}`);
}

runApp().catch(console.error);
