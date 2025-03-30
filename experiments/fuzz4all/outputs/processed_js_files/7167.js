 
const customAsyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    for (let i = 0; i < 3; i++) {
      yield new Promise(resolve => setTimeout(() => resolve(`Iteration ${i + 1}`), 1000));
    }
  }
};

 
const targetObject = {
  greet: 'Hello',
  subject: 'world'
};

const handler = {
  get: function(target, property, receiver) {
    print(`Accessing property: ${property}`);
    return Reflect.get(target, property, receiver);
  }
};

const proxy = new Proxy(targetObject, handler);

 
function taggedTemplate(strings, ...values) {
  return strings.reduce((result, string, i) => `${result}${string.toUpperCase()}${values[i] ? `**${values[i]}**` : ''}`, '');
}

const name = 'JavaScript';
const message = taggedTemplate`Welcome to the world of ${name}`;

 
(async function() {
  print(proxy.greet + ', ' + proxy.subject + '!');  
  
  print(message);  

   
  for await (const message of customAsyncIterable) {
    print(message);
  }
})();
