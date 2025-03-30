 

 
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
async function fetchData(delay, generator) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generator.next().value);
    }, delay);
  });
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    return `Property ${prop} does not exist.`;
  },
  set(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value;
    } else {
      print('Only numeric values are allowed');
    }
  }
};

 
const data = { count: 0 };
const proxyData = new Proxy(data, handler);

 
async function main() {
  const gen = numberGenerator();
  const results = [];

  for (let i = 0; i < 5; i++) {
    results.push(await fetchData(1000, gen));  
  }

  results.forEach((result, index) => {
    proxyData[`value${index}`] = result;
    print(`Fetched Value ${index}:`, proxyData[`value${index}`]);
  });

   
  print(proxyData.nonExistentProperty);
}

main();
