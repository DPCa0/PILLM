class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function complexFunction() {
  const deferred = new Deferred();
  
  setTimeout(() => {
    deferred.resolve("Timeout resolved!");
  }, 500);

  const asyncIter = asyncGenerator(5);

  const values = await Promise.all([
    (async () => {
      let result = "";
      for await (let num of asyncIter) {
        result += num;
      }
      return result;
    })(),
    deferred.promise
  ]);

  print(values);
  await sleep(300);
  return "Process Completed!";
}

(async () => {
  try {
    const result = await complexFunction();
    print(result);
  } catch (error) {
    console.error("Error:", error);
  }
})();
