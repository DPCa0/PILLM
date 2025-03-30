 
import fs from 'fs/promises';

 
(async () => {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }

   
  const handler = {
    get: (obj, prop) => {
      print(`Getting ${prop}`);
      return obj[prop];
    },
  };

  const data = { name: "JavaScript", type: "Language" };
  const proxyData = new Proxy(data, handler);

  print(proxyData.name);  

   
  const filePath = 'example.txt';
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    print(`File Content: ${fileContent}`);
  } catch (error) {
    console.error(`Error reading file: ${error}`);
  }

   
  const map = new Map();
  map.set({ id: 1 }, "Value 1");
  map.set({ id: 2 }, "Value 2");

  print([...map]);  

   
  async function* asyncNumberGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
  }

  for await (const num of asyncNumberGenerator()) {
    print(`Async num: ${num}`);
  }

   
  const numbers = [1, 2, 3, 4, 5];
  const squaredNumbers = numbers.map(num => num ** 2);
  print(`Squared Numbers: ${squaredNumbers}`);

   
  const uniqueValues = new Set([1, 2, 2, 3, 4, 4, 5]);
  print(`Unique Values: ${[...uniqueValues]}`);

   
  function tagged(strings, ...values) {
    return