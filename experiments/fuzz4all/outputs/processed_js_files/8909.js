 
async function* streamData(iterations) {
    for (let i = 0; i < iterations; i++) {
         
        await new Promise(resolve => setTimeout(resolve, 100));
        yield `Data chunk ${i}`;
    }
}

 
const dataHandler = {
    get: function(target, prop) {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

 
const data = new Proxy({
    totalChunks: 10
}, dataHandler);

 
(async () => {
    print('Streaming data:');
    for await (const chunk of streamData(data.totalChunks)) {
        print(chunk);
    }
})();

 
class StreamStatistics {
    #totalDataReceived = 0;

    static updateStatistics(instance, dataSize) {
        instance.#totalDataReceived += dataSize;
        print(`Total data received: ${instance.#totalDataReceived}`);
    }
}

 
const stats = new StreamStatistics();
StreamStatistics.updateStatistics(stats, 100);
StreamStatistics.updateStatistics(stats, 200);
