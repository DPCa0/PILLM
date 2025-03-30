 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchRandomNumber() {
  await delay(500);  
  return Math.floor(Math.random() * 100);
}

 
const targetObject = {
  message: "Hello, World!",
  number: 42
};

const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
async function main() {
  print(proxyObject.message);  

  const randomNum = await fetchRandomNumber();
  proxyObject.number = randomNum;  

  print(`Random Number: ${proxyObject.number}`);  
}

main().catch(console.error);
