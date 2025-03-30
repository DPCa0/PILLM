 

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const numberProxyHandler = {
  get: (target, prop) => {
    if (prop === 'next') {
      return () => {
        const { value } = target.next();
        return value <= 10 ? value : "Limit reached";
      };
    }
    return target[prop];
  }
};

const gen = numberGenerator();
const proxyGen = new Proxy(gen, numberProxyHandler);

 
async function logNumbers() {
  const log = [];
  let value;
  while ((value = proxyGen.next()) !== "Limit reached") {
    log.push(value);
  }
  return log;
}

 
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

 
(async function execute() {
  const result = await logNumbers();
  for (const num of result) {
    print(num);
    await delay(500);
  }
  print('Finished logging numbers');
})();
