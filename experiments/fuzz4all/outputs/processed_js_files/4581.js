 
async function* fibonacciSequence(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const capitalizeWords = (str) => 
  str.replace(/\b\w/g, char => char.toUpperCase());

 
const handler = {
  get: (target, prop) => {
    print(`Getting property '${prop}'`);
    return prop in target ? target[prop] : `Property '${prop}' not found`;
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

const person = new Proxy({ name: "john doe", age: 25 }, handler);

 
(async () => {
  print(capitalizeWords(person.name));  

   
  person.gender = "male";

   
  for await (const num of fibonacciSequence(20)) {
    print(num);
  }

   
  const results = await Promise.all([
    new Promise(resolve => setTimeout(() => resolve('Task 1 completed'), 1000)),
    new Promise(resolve => setTimeout(() => resolve('Task 2 completed'), 500)),
  ]);

  print(results);
})();
