 

 
function* promiseSequence() {
  for (let i = 1; i <= 3; i++) {
    yield new Promise((resolve) => setTimeout(() => resolve(i * 2), 1000));
  }
}

 
const handler = {
  apply: async function (target, thisArg, argumentsList) {
    print("Processing...");
    const result = await target.apply(thisArg, argumentsList);
    print("Result:", result);
    return result;
  }
};

 
async function asyncProcess(generator) {
  let results = [];
  for (let promise of generator) {
    const res = await promise;
    results.push(res);
  }
  return results;
}

 
const proxiedAsyncProcess = new Proxy(asyncProcess, handler);

 
(async () => {
  try {
    print("Starting complex process...");
    const results = await proxiedAsyncProcess(promiseSequence());
    print("Final Results:", results);
  } catch (error) {
    console.error("Error:", error);
  }
})();
