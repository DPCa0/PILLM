 

 
const simulateAsyncOperation = (duration, value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.1 ? resolve(value) : reject(new Error('Random error occurred'));
        }, duration);
    });
};

 
const complexAsyncFlow = async () => {
    try {
        const startTime = performance.now();
        print('Starting complex async flow');

         
        const [data1, data2] = await Promise.all([
            simulateAsyncOperation(1000, 'Data from Operation 1'),
            simulateAsyncOperation(2000, 'Data from Operation 2')
        ]);

        print('Received data1:', data1);
        print('Received data2:', data2);

         
        const processedData = await simulateAsyncOperation(1500, `Processed ${data1} and ${data2}`);
        print('Processed Data:', processedData);

         
        const uniqueData = new Set([data1, data2, processedData, processedData]);
        print('Unique Data:', Array.from(uniqueData));

         
        const dataMap = new Map();
        dataMap.set('original1', data1);
        dataMap.set('original2', data2);
        dataMap.set('processed', processedData);

         
        dataMap.forEach((value, key) => {
            print(`Map entry [${key}]: ${value}`);
        });

        const endTime = performance.now();
        print(`Complex async flow completed in ${(endTime - startTime).toFixed(2)} ms`);

    } catch (error) {
        console.error('Error in complex async flow:', error.message);
    }
};

 
complexAsyncFlow();
