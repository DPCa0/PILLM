 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
  yield delay(1000).then(() => "First value after 1 second");
  yield delay(2000).then(() => "Second value after 2 seconds");
  yield delay(1500).then(() => "Third value after 1.5 seconds");
}

 
async function runAsyncGenerator() {
  for await (let value of asyncGenerator()) {
    print(value);
  }
}

 
function complexPromiseChaining() {
  return new Promise((resolve, reject) => {
    let value = 5;
    if (value > 3) {
      resolve(value);
    } else {
      reject("Value is too low");
    }
  })
    .then(value => value * 2)
    .then(value => {
      if (value < 15) {
        throw new Error("Value is still too low");
      }
      return value;
    })
    .catch(error => {
      console.error("Error encountered:", error);
      return 20;  
    })
    .finally(() => print("Promise chain completed"));
}

 
const handler = {
  get: function(target, property) {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return target[property];
    }
    return `Property ${property} not found`;
  },
};

const targetObject = { name: "Advanced JavaScript", level: "Complex" };
const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
  print("Proxy test:", proxyObject.name);  
  print("Proxy test:", proxyObject.missingProperty);  

  await runAsyncGenerator();  

  const result = await complexPromiseChaining();
  print("Final result from promise chain:", result);
})();
