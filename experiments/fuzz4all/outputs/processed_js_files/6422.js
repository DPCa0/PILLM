 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
const handler = {
  set(target, property, value) {
    print(`Setting value ${value} to ${property}`);
    target[property] = value;
    return true;
  }
};

const observedObject = new Proxy({}, handler);

 
async function main() {
   
  const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
  const {[...keys]: myKeys} = Object.fromEntries(myMap.entries());
  
  print('Map Keys:', myKeys);

   
  observedObject.a = 10;
  observedObject.b = 20;

   
  const results = await Promise.all([
    delay(1000).then(() => 'First Task Done'),
    delay(500).then(() => 'Second Task Done')
  ]);

   
  const allResults = [...results];
  print('Results:', allResults);

   
  const uniqueValues = new Set([...myKeys, ...allResults]);
  print('Unique Values:', uniqueValues);
}

main().catch(console.error);
