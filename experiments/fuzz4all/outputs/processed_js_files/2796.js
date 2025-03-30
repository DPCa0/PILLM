class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processSequence(generator, transformFn, batchSize = 5, interval = 1000) {
  const queue = [];
  
  for await (const value of generator) {
    queue.push(transformFn(value));
    
    if (queue.length === batchSize) {
      const deferred = new Deferred();
      Promise.all(queue.splice(0)).then(deferred.resolve);
      print(`Processing batch...`);
      await deferred.promise;
      await delay(interval);
    }
  }

  if (queue.length) {
    print(`Processing final batch...`);
    await Promise.all(queue);
  }
}

(async function main() {
  const fibSeq = fibonacci(20);
  
  await processSequence(
    fibSeq,
    (num) => delay(500).then(() => console.log(`Processed: ${num}`))
  );
})();
