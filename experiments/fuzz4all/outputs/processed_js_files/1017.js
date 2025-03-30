 

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting value of ${prop}`);
    return Reflect.get(...arguments);  
  },
  set: function(target, prop, value, receiver) {
    print(`Setting value of ${prop} to ${value}`);
    return Reflect.set(...arguments);  
  }
};

const obj = new Proxy({}, handler);

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

const gen = numberGenerator();

 
async function processNumbers() {
  for await (let num of generateAsyncNumbers()) {
    print(`Processing number: ${num}`);
    if (num > 5) break;
  }
}

async function* generateAsyncNumbers() {
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield gen.next().value;
  }
}

 
(async () => {
  obj.name = "Advanced JavaScript";
  print(`Name: ${obj.name}`);
  
  print("Starting to process numbers asynchronously...");
  await processNumbers();
})();
