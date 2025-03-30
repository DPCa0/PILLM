 
async function* fetchData() {
  const data = ["apple", "banana", "cherry"];
  for (const item of data) {
    await new Promise((resolve) => setTimeout(resolve, 1000));  
    yield item;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing ${property} of array`);
    return target[property];
  }
};

const fruits = new Proxy(["apple", "banana", "cherry"], handler);

 
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ? `<strong>${values[i]}</strong>` : ""), "");
}

 
(async () => {
  print(highlight`Start fetching data: ${new Date().toLocaleTimeString()}`);
  
  const results = [];
  for await (const fruit of fetchData()) {
    results.push(fruit);
  }
  
   
  const uniqueFruits = new Set(results);
  const processedFruits = Array.from(uniqueFruits).map((fruit) => fruit.toUpperCase());

   
  const finalResult = Array.from(processedFruits, (fruit) => `Fruit: ${fruit}`);
  
   
  print(finalResult?.join("\n") ?? "No results");
  
   
  print(fruits[1]);
})();
