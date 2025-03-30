 

 
function* randomDelayGenerator() {
  while (true) {
    yield Math.floor(Math.random() * 1000) + 500;
  }
}

 
const handler = {
  get: function(target, prop) {
    print(`Property '${prop}' accessed`);
    return target[prop];
  }
};

 
async function asyncOperation(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Operation ${name} completed after ${delay} ms`);
    }, delay);
  });
}

(async () => {
  const delayGenerator = randomDelayGenerator();
  
   
  const operations = new Proxy({
    op1: async () => await asyncOperation('1', delayGenerator.next().value),
    op2: async () => await asyncOperation('2', delayGenerator.next().value),
    op3: async () => await asyncOperation('3', delayGenerator.next().value)
  }, handler);

   
  try {
    const results = await Promise.all([
      operations.op1(),
      operations.op2(),
      operations.op3()
    ]);

     
    print(`Results:\n${results.map(result => `- ${result}`).join('\n')}`);
  } catch (error) {
    console.error('Error executing operations:', error);
  }
})();
