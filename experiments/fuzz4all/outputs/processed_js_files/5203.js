 
const { EventEmitter } = require('events');

 
class AdvancedFeatureDemo {
     
    #name;
    #version;

     
    const initEventSymbol = Symbol('initEvent');
    const logSymbol = Symbol('log');

    constructor(name, version) {
        this.#name = name;
        this.#version = version;
        this.emitter = new EventEmitter();
        this[initEventSymbol]();
    }

     
    [initEventSymbol]() {
        this.emitter.on('start', () => this[logSymbol](`Starting ${this.#name} v${this.#version}`));
        this.emitter.on('stop', () => this[logSymbol](`Stopping ${this.#name} v${this.#version}`));
    }

     
    [logSymbol](message) {
        print(message);
    }

     
    start() {
        this.emitter.emit('start');
    }

     
    stop() {
        this.emitter.emit('stop');
    }

     
    static combineVersions(...versions) {
        return versions.reduce((acc, curr) => `${acc}.${curr}`);
    }
}

 
async function runDemo() {
    const version = AdvancedFeatureDemo.combineVersions(1, 2, 3);
    const demo = new AdvancedFeatureDemo('AdvancedFeatureDemo', version);
    
    demo.start();

     
    await new Promise(resolve => setTimeout(resolve, 1000));

    demo.stop();

     
    const { writeFile } = await import('fs/promises');
    await writeFile('demo.txt', 'Demo completed!');
}

runDemo().catch(console.error);
