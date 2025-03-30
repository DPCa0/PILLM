(async () => {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  const processNumbers = ([first, ...rest]) => {
    const sum = rest.reduce((acc, num) => acc + num, 0);
    return { first, sum };
  };

   
  const handler = {
    get: (obj, prop) => {
      return prop in obj ? obj[prop] : `Property ${prop} not found!`;
    }
  };
  const proxiedObj = new Proxy({ a: 1, b: 2 }, handler);

   
  const uniqueKey = Symbol('uniqueKey');
  const objWithSymbol = {
    [uniqueKey]: 'This is a symbol key!'
  };

   
  const asyncSquare = async (x) => {
    await delay(500);
    return x * x;
  };

   
  async function* asyncGenerator() {
    const nums = [1, 2, 3, 4];
    for (const num of nums) {
      yield await asyncSquare(num);
    }
  }

   
  const main = async () => {
    print('Using destructuring and rest:', processNumbers([10, 20, 30, 40]));
    print('Proxy object:', proxiedObj.a, proxiedObj.c);
    print('Object with Symbol:', objWithSymbol[uniqueKey]);
    
    print('Squares from async generator:');
    for await (const square of asyncGenerator()) {
      print(square);
    }
  };

  main();
})();
