 

 
async function fetchDataWithDelay(url) {
  const simulateFetch = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('No URL provided');
      }
    }, 2000);
  });

  try {
    const data = await simulateFetch;
    print(`Success: ${data}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
const target = { name: 'JavaScript', type: 'Programming Language' };
const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' accessed`);
    return prop in obj ? obj[prop] : `No property '${prop}'`;
  }
};
const proxy = new Proxy(target, handler);

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
function processNumbers([first, ...rest]) {
  print(`First number: ${first}`);
  print(`Rest of numbers: ${rest.join(', ')}`);
}

 
(async () => {
  await fetchDataWithDelay('https://api.example.com/data');
  
  print(proxy.name);
  print(proxy.description);

  const gen = numberGenerator();
  processNumbers([gen.next().value, gen.next().value, gen.next().value]);
})();
