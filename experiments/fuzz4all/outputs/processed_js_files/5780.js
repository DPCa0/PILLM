 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

 
async function processSequence(generator) {
  for (let value of generator) {
    print(`Processing value: ${value}`);
    await delay(1000);  
  }
  print("Sequence processing complete.");
}

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
  get(target, prop, receiver) {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};
const proxy = new Proxy(targetObject, handler);

 
async function main() {
  print("Starting main function...");
  
   
  print(`Property a: ${proxy.a}`);
  print(`Property b: ${proxy.b}`);

   
  const sequence = generateSequence();
  await processSequence(sequence);

  print("Main function complete.");
}

 
main();
