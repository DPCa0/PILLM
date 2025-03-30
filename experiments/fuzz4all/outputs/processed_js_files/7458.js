 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncFunction = async (num) => {
  await delay(1000);
  return num * 2;
};

const handler = {
  get: async (target, prop) => {
    if (prop in target) {
      let result = await asyncFunction(target[prop]);
      print(`Doubling ${target[prop]} to get ${result}`);
      return result;
    }
    return 0;
  },
};

const numbers = new Proxy(new Map(), handler);

numbers.set(1, 10);
numbers.set(2, 20);
numbers.set(3, 30);

(async () => {
  for (let i = 1; i <= 3; i++) {
    let doubledValue = await numbers.get(i);
    print(`Doubled value for key ${i}: ${doubledValue}`);
  }
})();
