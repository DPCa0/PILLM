 

 
const targetObject = { language: 'JavaScript' };
const handler = {
  get: (target, prop) => {
    print(`Accessing property '${prop}'`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);

 
async function delayedGreeting() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 'Hello, world!';
}

 
function* steps() {
  yield "Step 1: Creating a proxy object.";
  yield "Step 2: Using an async function to delay greeting.";
  yield "Step 3: Running everything together.";
}

 
function formatOutput(step, result) {
  return `🎉 ${step}\n📢 Result: ${result}`;
}

 
async function main() {
  const stepGenerator = steps();
  
  for (const step of stepGenerator) {
    print(`🔄 ${step}`);
  }

   
  print(`Language: ${proxy.language}`);
  proxy.language = 'Advanced JS';
  
  const greeting = await delayedGreeting();
  print(formatOutput(stepGenerator.next().value, greeting));
}

main();
