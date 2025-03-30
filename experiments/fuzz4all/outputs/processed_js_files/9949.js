 
const { EventEmitter } = require('events');

 
function* fibonacciSequence() {
    let [prev, curr] = [0, 1];
    for (;;) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
function delayedComputation(value) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value * 2), 1000);
    });
}

 
class MyEmitter extends EventEmitter {
    async emitAndCompute() {
        print('Start computation');
        this.emit('start');
        const fib = fibonacciSequence();
        let result = 0;

         
        for (let i = 0; i < 5; i++) {
            result = await delayedComputation(fib.next().value);
            print(`Fibonacci doubled: ${result}`);
            this.emit('data', result);
        }

        print('Computation done');
        this.emit('end');
    }
}

 
(async () => {
    const myEmitter = new MyEmitter();

     
    myEmitter.on('start', () => print('Event: start'));
    myEmitter.on('data', (data) => print(`Event: data with value ${data}`));
    myEmitter.on('end', () => print('Event: end'));

     
    await myEmitter.emitAndCompute();
})();
