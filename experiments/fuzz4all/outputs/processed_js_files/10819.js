 
const { EventEmitter } = require('events');

 
class ComplexEventEmitter extends EventEmitter {
  constructor() {
    super();
  }

  triggerComplexEvent(data) {
     
    this.emit('complexEvent', data);
  }
}

 
const complexHandler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      print(`Property ${prop} does not exist`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const complexObject = {
  name: 'Advanced JS',
  type: 'Program'
};

 
const proxiedComplexObject = new Proxy(complexObject, complexHandler);

 
const emitter = new ComplexEventEmitter();

 
emitter.on('complexEvent', (data) => {
  print('Complex Event Triggered:', data);
});

 
async function executeComplexTask() {
  print('Starting complex task...');
  await new Promise((resolve) => setTimeout(resolve, 2000));  
  print('Complex task completed.');
  
   
  print(`Object Name: ${proxiedComplexObject.name}`);
  proxiedComplexObject.type = 'Updated Program';
  
   
  emitter.triggerComplexEvent({ message: 'Task completed successfully!' });
}

executeComplexTask();
