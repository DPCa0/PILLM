 

 
(async () => {
   
  async function fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ name: "Advanced JavaScript", year: 2023 }), 1000);
    });
  }

   
  function* dataGenerator() {
    const data = yield fetchData();
    print("Data fetched from generator:", data);
  }

   
  const target = {
    message: "Hello, world!",
  };

  const handler = {
    get: (obj, prop) => {
      if (prop === "message") {
        return obj[prop] + " Welcome to advanced features.";
      }
      return obj[prop];
    },
  };

  const proxy = new Proxy(target, handler);
  print(proxy.message);

   
  const generator = dataGenerator();
  const promise = generator.next().value;

   
  const resolvedData = await promise;
  generator.next(resolvedData);
})();
