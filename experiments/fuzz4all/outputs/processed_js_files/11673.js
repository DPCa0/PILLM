 
const { EventEmitter } = require('events');

 
class AdvancedEmitter extends EventEmitter {
    constructor() {
        super();
         
        this.eventMap = new Map();
    }

     
    registerEvent(eventName, handler) {
        this.on(eventName, handler);
        this.eventMap.set(eventName, handler);
    }

     
    triggerEvent(eventName, ...args) {
        if (this.eventMap.has(eventName)) {
             
            this.emit(eventName, ...args);
        } else {
            print(`No event registered with name: ${eventName}`);
        }
    }

     
    removeEvent(eventName) {
        if (this.eventMap.has(eventName)) {
            this.off(eventName, this.eventMap.get(eventName));
            this.eventMap.delete(eventName);
        }
    }
}

 
const emitter = new AdvancedEmitter();

 
const greetHandler = ({ name = 'World' }) => {
    print(`Hello, ${name}!`);
};

 
emitter.registerEvent('greet', greetHandler);

 
emitter.triggerEvent('greet', { name: 'Alice' });  

 
emitter.triggerEvent('greet', {});  

 
emitter.removeEvent('greet');

 
emitter.triggerEvent('greet', { name: 'Bob' });  
