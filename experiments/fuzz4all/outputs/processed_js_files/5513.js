 
const EventEmitter = require('events');

 
class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.data = { message: 'Hello, world!', count: 0 };
  }

   
  async processData() {
    try {
      const processedData = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const { message, count } = this.data;
          if (count < 5) {
            resolve(`${message} Processed count: ${count}`);
          } else {
            reject(new Error('Count exceeded limit.'));
          }
        }, 1000);
      });
      print(processedData);
      this.data.count++;
    } catch (error) {
      console.error(error.message);
    }
  }

   
  start() {
    this.on('process', async () => {
      while (this.data.count < 5) {
        await this.processData();
      }
    });
  }
}

 
const myEmitter = new MyEmitter();
myEmitter.start();
myEmitter.emit('process');
