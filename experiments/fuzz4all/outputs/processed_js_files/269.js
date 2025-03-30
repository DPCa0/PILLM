 
async function fetchData() {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
}

 
const handler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

(async () => {
   
  const fruits = await fetchData();

   
  const proxiedFruits = new Proxy(fruits, handler);

   
  const [firstFruit, ...rest] = proxiedFruits;
  proxiedFruits.push('date');

   
  const upperCasedFruits = proxiedFruits.map(fruit => fruit.toUpperCase());

   
  print(`First fruit: ${firstFruit}`);
  print(`Rest of fruits: ${rest.join(', ')}`);
  print(`All fruits in uppercase: ${upperCasedFruits.join(', ')}`);
})();
