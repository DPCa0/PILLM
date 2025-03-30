 
import { EventEmitter } from 'events';

 
class AdvancedGreeter extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
    }

     
    #privateGreetMessage() {
        return `Hello, ${this.name}! Welcome to the advanced JavaScript world.`;
    }

    greet() {
         
        const message = this.#privateGreetMessage()?.toUpperCase() ?? 'DEFAULT GREETINGS';
        
         
        this.emit('greet', message);
    }
}

 
(async () => {
    const greeter = new AdvancedGreeter('world');
    
     
    function* messageGenerator() {
        yield 'Hello,';
        yield 'this is a complex';
        yield 'JavaScript program!';
    }

     
    const messageParts = [];
    for (const part of messageGenerator()) {
        messageParts.push(part);
    }
    print(messageParts.join(' '));

     
    greeter.on('greet', (message) => {
        print(message);
    });

     
    const { default: chalk } = await import('chalk');

     
    function styleMessage(strings, expr) {
        return chalk.blue.bold(strings[0] + expr + strings[1]);
    }

     
    print(styleMessage`The generated message is: ${messageParts.join(' ')}`);

    greeter.greet();
})();
