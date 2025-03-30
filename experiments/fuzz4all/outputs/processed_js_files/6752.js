 

function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

function createFibonacciObservable(limit) {
  const iterator = fibonacciGenerator();
  let count = 0;

  return {
    subscribe: (onNext, onComplete, onError) => {
      const interval = setInterval(() => {
        try {
          if (count < limit) {
            const { value, done } = iterator.next();
            onNext(value);
            count++;
            if (done) {
              clearInterval(interval);
              onComplete();
            }
          } else {
            clearInterval(interval);
            onComplete();
          }
        } catch (error) {
          clearInterval(interval);
          onError(error);
        }
      }, 500);
    },
  };
}

async function consumeObservable(observable) {
  return new Promise((resolve, reject) => {
    const results = [];
    observable.subscribe(
      (value) => {
        print("Next Fibonacci Number:", value);
        results.push(value);
      },
      () => {
        print("Observable complete");
        resolve(results);
      },
      (error) => {
        console.error("Observable error:", error);
        reject(error);
      }
    );
  });
}

 
const fibonacciProxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}': ${target[prop]}`);
      return target[prop];
    } else {
      console.error(`Property '${prop}' not found`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to ${value}`);
    target[prop] = value;
    return true;
  },
};

const fibonacciSettings = {
  limit: 10,
};

const proxiedSettings = new Proxy(fibonacciSettings, fibonacciProxyHandler);

(async () => {
  const observable = createFibonacciObservable(proxiedSettings.limit);
  try {
    const result = await consumeObservable(observable);
    print("Fibonacci sequence:", result);
  } catch (error) {
    console.error("Error while consuming observable:", error);
  }
})();
