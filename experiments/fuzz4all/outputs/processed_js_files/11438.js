 
const EventEmitter = require('events');

 
class ComplexEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.on('data', this.handleData);
    this.on('error', this.handleError);
  }

   
  emitData = (data) => {
    setTimeout(() => {
      if (typeof data !== 'string') {
        this.emit('error', new TypeError('Data must be a string'));
      } else {
        this.emit('data', data.toUpperCase());
      }
    }, 500);
  };

  handleData(data) {
    print(`Received data: ${data}`);
    if (data.includes('NODE')) {
      this.emit('complete');
    }
  }

  handleError(err) {
    console.error(`Error: ${err.message}`);
  }
}

 
const runComplexScenario = () => {
  const myEmitter = new ComplexEventEmitter();

  myEmitter.on('complete', () => {
    print(`Task completed successfully!`);
  });

  const dataArray = ['hello', 'world', 'node.js'];
  
   
  for (const data of dataArray) {
    myEmitter.emitData(...[data]);
  }
};

 
(async () => {
  await new Promise(resolve => {
    runComplexScenario();
    setTimeout(resolve, 2000);
  });
  print('Finished executing complex scenario.');
})();
