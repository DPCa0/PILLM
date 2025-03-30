 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(['apple', 'banana', 'cherry']);
  }, 1000);
});

 
async function* asyncGenerator() {
  const data = await fetchData();
  for (const item of data) {
    yield item.toUpperCase();
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  }
};

const fruits = { apple: 1, banana: 2, cherry: 3 };
const proxyFruits = new Proxy(fruits, handler);

(async () => {
  const iterableFruits = asyncGenerator();

  print('Fetching and processing fruits asynchronously...');
  for await (const fruit of iterableFruits) {
    print(fruit);
  }

  print('\nAccessing fruits through Proxy...');
  print('Apple count:', proxyFruits.apple);
  print('Banana count:', proxyFruits.banana);
})();
