const { fromEvent, interval } = rxjs;
const { map, takeUntil, mergeMap, finalize } = rxjs.operators;

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const animateOutput = async message => {
  for (const char of message) {
    process.stdout.write(char);
    await delay(100);  
  }
  print();
};

 
const startButton = document.querySelector('#startButton');
const stopButton = document.querySelector('#stopButton');

fromEvent(startButton, 'click')
  .pipe(
    mergeMap(() => interval(1000).pipe(
      map(i => `Event #${i + 1}`),
      takeUntil(fromEvent(stopButton, 'click')),
      finalize(() => animateOutput('Event Stream Stopped'))
    ))
  )
  .subscribe(event => print(event));

 
class Fibonacci {
  *generate(max) {
    let [a, b] = [0, 1];
    while (a <= max) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

 
const fibInstance = new Fibonacci();
const maxVal = 100;
const fibSequence = [...fibInstance.generate(maxVal)];
print(`Fibonacci Sequence up to ${maxVal}: ${fibSequence.join(', ')}`);

 
const user = { name: 'Alice', age: 30 };
const userProxy = new Proxy(user, {
  get(target, prop) {
    print(`Accessed property "${prop}": ${target[prop]}`);
    return target[prop];
  }
});

print(userProxy.name);
print(userProxy.age);
