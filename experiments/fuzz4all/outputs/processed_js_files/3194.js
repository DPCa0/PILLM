(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

   
  const handler = {
    get(target, prop) {
      print(`Accessing property "${prop}"`);
      return target[prop];
    }
  };

  const target = { message: 'Hello, world!' };
  const proxy = new Proxy(target, handler);

   
  const logFibonacci = async (count) => {
    const fibGen = fibonacci();
    for (let i = 0; i < count; i++) {
      print(fibGen.next().value);
      await delay(500);  
    }
  };

  print(proxy.message);  
  await logFibonacci(10);  
})();
