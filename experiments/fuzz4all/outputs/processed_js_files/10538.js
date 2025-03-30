 
(async () => {
   
  function* numberGenerator() {
    let i = 0;
    while (true) yield i++;
  }

  const nums = numberGenerator();

   
  const handler = {
    get: (target, prop, receiver) => {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        print(`Property "${prop}" not found, returning undefined.`);
        return undefined;
      }
    },
  };

  const data = {
    async fetchData() {
       
      return new Promise((resolve) => setTimeout(() => resolve(nums.next().value), 1000));
    },
  };

  const proxiedData = new Proxy(data, handler);

   
  for (let i = 0; i < 3; i++) {
    const value = await proxiedData.fetchData();
    print(`Fetched Value: ${value}`);
  }
})();
