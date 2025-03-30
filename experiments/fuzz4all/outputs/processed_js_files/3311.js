 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function* greetingGenerator() {
  const greetings = ['Hello', 'Hola', 'Bonjour', 'Hallo', 'Ciao'];
  for (const greeting of greetings) {
    await delay(1000);  
    yield `${greeting}, World!`;
  }
}

 
const consoleProxy = new Proxy(console, {
  get(target, prop) {
    if (prop === 'log') {
      return function (...args) {
        target.log('Proxy intercepted:', ...args);
      };
    }
    return target[prop];
  },
});

 
(async () => {
   
  const greetingSet = new WeakSet();
  for await (const message of greetingGenerator()) {
    const msgObject = { message };
    
    if (!greetingSet.has(msgObject)) {
      greetingSet.add(msgObject);
      consoleProxy.log(message);
    }
  }
})();
