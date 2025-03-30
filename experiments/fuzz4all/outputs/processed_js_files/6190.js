 

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
async function processNumbers(generator, handler) {
  for (let i = 0; i < 10; i++) {
    let number = generator.next().value;
    print(await handler(number));
  }
}

 
const numberHandler = {
  get: (target, prop) => {
    if (prop === 'process') {
      return async (num) => `Number: ${await target[prop](num)}`;
    }
    return target[prop];
  },
};

 
const processor = {
  async process(num) {
     
    return new Promise((resolve) => {
      setTimeout(() => resolve(num * 2), 100);
    });
  },
};

 
const proxiedProcessor = new Proxy(processor, numberHandler);

 
processNumbers(numberGenerator(), proxiedProcessor.process);
