class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  speak() {
    print(`${this.name} barks.`);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'speak') {
      return function() {
        print('Intercepted!');
        return Reflect.get(target, prop, receiver).apply(this, arguments);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

const fido = new Dog('Fido');
const proxyFido = new Proxy(fido, handler);

proxyFido.speak();  

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

fetchData('https://jsonplaceholder.typicode.com/todos/1');

 
function* stateGenerator() {
  let state = 0;
  while (true) {
    state = yield state;
  }
}

const stateMachine = stateGenerator();
stateMachine.next();  
print(stateMachine.next(1).value);  
print(stateMachine.next(2).value);  

 
const uniqueKey = Symbol('unique');
const uniqueSet = new Set();

uniqueSet.add({ [uniqueKey]: 1 });
uniqueSet.add({ [uniqueKey]: 2 });
uniqueSet.add({ [uniqueKey]: 1 });  

print(uniqueSet.size);  
