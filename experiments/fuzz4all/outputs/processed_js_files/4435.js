(async () => {
   
  const target = {
    language: 'JavaScript',
    greet: 'Hello',
  };

  const handler = {
    get: (obj, prop) => {
      if (prop in obj) {
        print(`Property '${prop}' was accessed.`);
        return obj[prop];
      } else {
        throw new Error(`Property '${prop}' does not exist.`);
      }
    },
    set: (obj, prop, value) => {
      print(`Setting property '${prop}' to '${value}'`);
      obj[prop] = value;
      return true;
    },
  };

  const proxy = new Proxy(target, handler);

   
  function* wordGenerator() {
    yield proxy.greet;
    yield 'world';
    yield '!';
  }

   
  async function complexGreeting() {
    const words = wordGenerator();
    for (let word of words) {
      await new Promise((resolve) =>
        setTimeout(() => {
          print(word);
          resolve();
        }, 1000)
      );
    }
  }

   
  await Promise.all([complexGreeting(), complexGreeting()]);

   
  const { language } = proxy;
  print(`This code is written in ${language}.`);
})();
