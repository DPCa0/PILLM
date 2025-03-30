 
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function complexAsyncOperation() {
  print('Starting complex operation...');

   
  const data = { x: 10, y: 20, z: 30 };
  const { x, ...rest } = data;

  print(`Extracted x: ${x}, Remaining: ${JSON.stringify(rest)}`);

   
  const proxyHandler = {
    get(target, prop) {
      print(`Accessing property '${prop}'`);
      return target[prop];
    },
  };

  const proxiedData = new Proxy(data, proxyHandler);
  print(`z value from proxy: ${proxiedData.z}`);

   
  const mathModule = await import('./math.js');  
  print(`Dynamic Import: Square of 4 is ${mathModule.square(4)}`);

   
  await wait(2000);
  print('Operation complete after waiting for 2 seconds');
}

 
export function square(n) {
  return n * n;
}

 
complexAsyncOperation().catch(console.error);

Please note: For the dynamic import to work as shown, `math.js` should be a separate module exporting a `square` function in the same directory. If running in an environment that doesn't support ES modules, adjustments may be necessary.