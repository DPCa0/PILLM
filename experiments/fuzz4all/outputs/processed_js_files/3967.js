 
const EventEmitter = require('events');

 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { message: 'Data fetched from API!' };
            resolve(data);
        }, 1000);
    });
};

 
async function* dataStream() {
    for (let i = 0; i < 3; i++) {
        const data = await fetchData();
        yield data;
    }
}

 
class DataHandler extends EventEmitter {
    constructor() {
        super();
    }

    async process() {
        for await (let data of dataStream()) {
            this.emit('dataReceived', data);
        }
    }
}

 
const handler = new DataHandler();

 
handler.on('dataReceived', (data) => {
    print(`Event Received: ${data.message}`);
});

 
(async () => {
    await handler.process();
    print('All data processed!');
})();
