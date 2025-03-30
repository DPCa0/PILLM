 

const targetArray = [1, 2, 3, 4, 5];

 
const hiddenSymbol = Symbol('hidden');

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'getSquareSum') {
      return async () => {
        const sum = target.reduce((acc, num) => acc + num * num, 0);
        return new Promise(resolve => setTimeout(() => resolve(sum), 1000));
      };
    }
    return Reflect.get(...arguments);
  }
};

 
const proxyArray = new Proxy(targetArray, handler);

 
async function main() {
  try {
    print('Original Array:', proxyArray);
    const squareSum = await proxyArray.getSquareSum();
    print('Sum of squares (with delay):', squareSum);

     
    proxyArray[hiddenSymbol] = 'This is a hidden property';
    print('Hidden Property:', proxyArray[hiddenSymbol]);

     
    const modifiedArray = proxyArray
      .map(x => x * 2)
      .filter(x => x > 5);

    print('Modified Array:', modifiedArray);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
