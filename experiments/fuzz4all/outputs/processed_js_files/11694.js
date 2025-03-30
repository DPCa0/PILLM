 
const asyncOperation = (message, delay) => 
  new Promise(resolve => setTimeout(() => resolve(message), delay));

 
(async () => {
  try {
    print('Starting async operations...');

     
    const [result1, result2] = await Promise.all([
      asyncOperation('First operation complete', 1000),
      asyncOperation('Second operation complete', 1500),
    ]);

    print(result1);
    print(result2);

     
    const target = { a: 1, b: 2, c: 3 };
    const handler = {
      get: (obj, prop) => {
        print(`Property '${prop}' accessed, value: ${obj[prop]}`);
        return obj[prop];
      }
    };

    const proxy = new Proxy(target, handler);
    print(proxy.a);   
    print(proxy.b);

     
    const { x = 10, y = 20 } = { y: 5 };
    print(`Destructured x: ${x}, y: ${y}`);

     
    const { sqrt } = await import('mathjs');   
    print(`Square root of 16 is: ${sqrt(16)}`);

    print('All operations complete!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
