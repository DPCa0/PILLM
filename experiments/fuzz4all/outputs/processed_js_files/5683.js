 

 
const handler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  },
};

const obj = new Proxy({}, handler);

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
async function processNumbers() {
  const generator = numberGenerator();
  for (let i = 0; i < 5; i++) {
    const number = generator.next().value;
    obj.number = number;  
    await new Promise((resolve) => setTimeout(resolve, 1000));  
  }
}

 
(async () => {
  print('Starting number processing...');
  await processNumbers();
  print('Finished processing numbers.');
})();
