 

 
const handler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  }
};

 
const targetObject = {
  greeting: "Hello",
  subject: "world",
  delay: 1000
};

 
const proxyObject = new Proxy(targetObject, handler);

 
function* greetGenerator() {
  yield `Step 1: Fetching greeting: ${proxyObject.greeting}`;
  yield `Step 2: Fetching subject: ${proxyObject.subject}`;
  yield `Step 3: Preparing message...`;
  yield `Step 4: Sending message after ${proxyObject.delay}ms...`;
}

 
async function sendGreeting() {
  const iterator = greetGenerator();

  for (let step of iterator) {
    print(step);
    await new Promise(resolve => setTimeout(resolve, proxyObject.delay));
  }

  print(`${proxyObject.greeting}, ${proxyObject.subject}!`);
}

 
sendGreeting();
