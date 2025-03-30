 
class Greeter {
  #greeting;

  constructor(greeting = 'Hello') {
    this.#greeting = greeting;
  }

   
  greet(name) {
    return `${this.#greeting}, ${name}!`;
  }

   
  static defaultInstance = new Greeter();

  static greetEveryone(names) {
    return names.map(name => Greeter.defaultInstance.greet(name));
  }
}

 
async function greetWithDelay(name, delay = 1000) {
  const greeter = new Greeter('Hi');
  await new Promise(resolve => setTimeout(resolve, delay));
  print(greeter.greet(name));
}

 
function* countdown(number) {
  while (number > 0) {
    yield number--;
  }
  return 'Done';
}

 
const [first, ...others] = Greeter.greetEveryone(['Alice', 'Bob', 'Charlie']);
print(first);  
print(others);  

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

const proxiedGreeter = new Proxy(new Greeter('Hey'), handler);
print(proxiedGreeter.greet('Dave'));  

 
(async function() {
  for await (const num of (async function* () {
    for (const n of countdown(3)) {
      await new Promise(resolve => setTimeout(resolve, 500));
      yield n;
    }
  })()) {
    print(num);
  }
})();

 
greetWithDelay('World');
