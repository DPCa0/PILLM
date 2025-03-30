 

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
async function fetchNumber(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Fetched number: ${n}`);
    }, 1000);
  });
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

 
const numbers = new Proxy([], handler);

(async function main() {
  const gen = numberGenerator();
  
   
  for (let i = 0; i < 5; i++) {
    const { value } = gen.next();
    print(`Generated number: ${value}`);
    numbers.push(value);
  }

   
  for (let num of numbers) {
    const result = await fetchNumber(num);
    print(result);
  }
})();
