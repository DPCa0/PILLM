 

function* generateNumbers(limit) {
  let num = 1;
  while (num <= limit) {
    yield num++;
  }
}

async function fetchWithDelay(number) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Fetched number: ${number}`), 100 * number)
  );
}

async function processNumbers(limit) {
  const numbers = generateNumbers(limit);
  let result = [];

  for (const num of numbers) {
    result.push(await fetchWithDelay(num));
  }
  return result;
}

const handler = {
  get: async (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      return `Property ${prop} not found`;
    }
  },
};

(async () => {
  const data = await processNumbers(5);
  const proxyData = new Proxy(data, handler);

  print(await proxyData[0]);  
  print(await proxyData[4]);  
  print(await proxyData[10]);  
})();
