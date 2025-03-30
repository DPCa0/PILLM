 

 
const target = { message: "Hello, World!" };
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};
const proxy = new Proxy(target, handler);

 
async function* asyncGenerator() {
  const greetings = ["Hello", "Hola", "Bonjour"];
  for (const greet of greetings) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield `${greet}, world!`;
  }
}

(async function() {
   
  let { message } = { ...proxy };
  proxy.message = "Hello, Universe!";
  
  print(message);

   
  for await (const msg of asyncGenerator()) {
    print(msg);
  }

   
  const set = new Set([1, 2, 3, 4]);
  const numbers = [...set].map(num => num * 2);
  print(numbers);

   
  const map = new Map();
  map.set('key1', 100);
  map.set('key2', 200);
  map.forEach((value, key) => {
    print(`Map entry - Key: ${key}, Value: ${value}`);
  });
})();
