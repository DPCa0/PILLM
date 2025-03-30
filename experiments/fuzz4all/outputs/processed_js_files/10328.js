 
const crypto = require('crypto');

 
async function advancedFunction() {
   
  function* numberGenerator() {
    let num = 0;
    while (true) {
      yield num++;
    }
  }

  const generator = numberGenerator();

   
  const generatorProxy = new Proxy(generator, {
    get(target, prop) {
      if (prop === 'next') {
        const originalNext = target.next;
        return function() {
          const result = originalNext.apply(target, arguments);
          return { value: result.value * 2, done: result.done };  
        };
      }
      return target[prop];
    }
  });

   
  async function asyncOperation(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
         
        const hash = crypto.createHash('sha256').update(data.toString()).digest('hex');
        resolve(hash);
      }, 1000);
    });
  }

   
  for (let i = 0; i < 5; i++) {
    const num = generatorProxy.next().value;
    print(`Original number doubled: ${num}`);
    const encrypted = await asyncOperation(num);
    print(`Encrypted output: ${encrypted}`);
  }
}

 
advancedFunction();
