 
const { EventEmitter } = require('events');

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
class ComplexSystem extends EventEmitter {
    constructor() {
        super();
        this.state = { data: [], status: 'initializing' };
    }
    
     
    async initialize() {
        print('System initializing...');
        await delay(1000);
        
        try {
            const { default: fs } = await import('fs/promises');  
            const data = await fs.readFile('./data.json', 'utf-8');  
            this.state.data = JSON.parse(data);
            this.state.status = 'ready';
            this.emit('ready', this.state);
        } catch (error) {
            this.state.status = 'error';
            this.emit('error', error);
        }
    }

     
    *generateSequence() {
        let index = 0;
        while (index < this.state.data.length) {
            yield this.state.data[index++];
        }
    }
}

 
const systemHandler = {
    get(target, prop, receiver) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(target, prop, receiver);
    }
};

(async () => {
    const system = new ComplexSystem();
    const proxiedSystem = new Proxy(system, systemHandler);

     
    proxiedSystem.on('ready', (state) => {
        print('System is ready:', state);

         
        const uniqueData = new Set(state.data);
        print('Unique data items:', uniqueData);

         
        for (const item of proxiedSystem.generateSequence()) {
            print('Item:', item);
        }
    });

    proxiedSystem.on('error', (error) => {
        console.error('Initialization failed:', error);
    });

    await proxiedSystem.initialize();
})();
