 
const { EventEmitter } = require('events');

 
class AdvancedEmitter extends EventEmitter {
  constructor() {
    super();
    this.on('data', this.handleData);
    this.on('error', this.handleError);
  }

   
  handleData = (data) => {
    print(`Received data: ${data}`);
    this.emit('processed', `Processed: ${data.toUpperCase()}`);
  };

  handleError = (error) => {
    console.error(`An error occurred: ${error}`);
  };

   
  async processData(data) {
    try {
      const result = await this.simulateAsyncProcessing(data);
      print(`Final result: ${result}`);
    } catch (error) {
      this.emit('error', error);
    }
  }

  simulateAsyncProcessing(data) {
    return new Promise((resolve, reject) => {
       
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve(`Asynchronously processed: ${data.toLowerCase()}`);
        } else {
          reject('Random failure');
        }
      }, 1000);
    });
  }
}

 
function handleEvent({ type = 'unknown', payload = '' } = {}) {
  const emitter = new AdvancedEmitter();
  emitter.processData(payload);

   
  const events = new Map([
    ['data', 'payload data'],
    ['error', 'error encountered'],
    ['processed', 'data processed'],
  ]);

  for (const [event, description] of events) {
    emitter.on(event, (info) => {
      print(`[${description}]: ${info}`);
    });
  }

  emitter.emit(type, payload);
}

 
handleEvent({ type: 'data', payload: 'Sample Event Data' });
