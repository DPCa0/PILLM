 

 
function* numbersGen() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

 
async function fetchNumber() {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(numbersGen().next().value), 1000);
  });
  return await promise;
}

 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      return Reflect.get(target, property, receiver);
    } else {
      console.warn(`Property ${property} does not exist on target`);
      return undefined;
    }
  },
  set(target, property, value, receiver) {
    if (typeof value === 'number' && value > 0) {
      return Reflect.set(target, property, value, receiver);
    } else {
      throw new Error('Value must be a positive number');
    }
  },
};

 
const numberStore = new Proxy({}, handler);

 
(async function main() {
  try {
    const num = await fetchNumber();
    print('Fetched number:', num);
    numberStore.latest = num;
    print('Number stored:', numberStore.latest);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
