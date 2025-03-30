 
async function simulateAsyncOperation(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
const targetObject = {
  greeting: 'Hello',
  target: 'world'
};

const handler = {
  get: function(obj, prop) {
    if (prop === 'greet') {
      return `${obj.greeting}, ${obj.target}!`;
    }
    return Reflect.get(...arguments);
  }
};

const proxy = new Proxy(targetObject, handler);

 
class Greeting {
  static async delayedGreeting(ms) {
    await simulateAsyncOperation(ms);
    print(proxy.greet);
  }
  
  async instanceGreetAndLog() {
    print('Preparing to greet...');
    await Greeting.delayedGreeting(1000);
    print('Greeted successfully!');
  }
}

 
const greetingsMap = new Map();

 
greetingsMap.set('greeting1', new Greeting());
greetingsMap.set('greeting2', new Greeting());

 
(async () => {
  for (let [key, greetingInstance] of greetingsMap.entries()) {
    print(`Invoking ${key}`);
    await greetingInstance.instanceGreetAndLog();
  }
})();
