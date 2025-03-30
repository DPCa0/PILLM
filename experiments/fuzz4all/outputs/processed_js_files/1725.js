(async function complexJavaScriptFeatures() {
   
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Getting ${prop}`);
        return target[prop];
      } else {
        throw new Error(`Property ${prop} does not exist.`);
      }
    },
  };

  const target = { message: "Hello, Advanced JavaScript World!" };
  const proxy = new Proxy(target, handler);

   
  try {
    print(Reflect.get(proxy, 'message'));
    print(Reflect.get(proxy, 'nonExistentProperty'));  
  } catch (error) {
    console.error(error);
  }

   
  const asyncTask = (msg, delay) => 
    new Promise(resolve => setTimeout(() => resolve(msg), delay));

  try {
    const result1 = await asyncTask("Task 1 Complete!", 1000);
    print(result1);

    const result2 = await asyncTask("Task 2 Complete!", 500);
    print(result2);
  } catch (err) {
    console.error("Error in async tasks", err);
  }

   
  function* generatorFunction() {
    print('Generator start');
    yield 1;
    yield 2;
    yield 3;
    print('Generator end');
  }

  const generator = generatorFunction();
  for (const value of generator) {
    print(value);
  }
})();
