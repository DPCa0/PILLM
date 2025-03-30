 
const { EventEmitter } = require('events');

 
async function* fetchData() {
    const data = ['foo', 'bar', 'baz'];
    for (const item of data) {
         
        await new Promise(resolve => setTimeout(resolve, 100));
        yield item;
    }
}

 
async function processData() {
    const processedData = [];
    
    for await (const item of fetchData()) {
        processedData.push(item.toUpperCase());
    }
    
    return processedData;
}

 
class DataEmitter extends EventEmitter {
    constructor() {
        super();
    }
    
     
    async emitData(data) {
        const promises = data.map((item, index) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (index % 2 === 0) resolve(item);
                    else reject(new Error(`Failed at ${item}`));
                }, Math.random() * 300);
            })
        );
        
        const results = await Promise.allSettled(promises);
        
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                this.emit('data', result.value);
            } else {
                this.emit('error', result.reason);
            }
        });
    }
}

 
(async () => {
    const dataEmitter = new DataEmitter();
    
     
    dataEmitter.on('data', (data) => {
        print(`Received data: ${data}`);
    });

     
    dataEmitter.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
    
     
    const data = await processData();
    await dataEmitter.emitData(data);
})();
