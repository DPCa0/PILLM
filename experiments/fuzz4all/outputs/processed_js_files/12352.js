 

function* numberGenerator(limit) {
  for (let i = 0; i <= limit; i++) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve(`Generated number: ${i}`), 100)
    );
  }
}

async function processNumbers(generator) {
  const results = [];
  for (let numberPromise of generator) {
    const number = await numberPromise;
    results.push(number);
    print(number);
  }
  return results;
}

const handler = {
  get(target, property, receiver) {
    if (property in target) {
      return Reflect.get(target, property, receiver);
    } else {
      throw new Error(`Property ${property} does not exist on target object.`);
    }
  },
};

const proxyTarget = {
  message: "Advanced JavaScript features in action!",
};

const proxy = new Proxy(proxyTarget, handler);

(async () => {
  print(proxy.message);

  try {
    print(proxy.nonExistentProperty);
  } catch (e) {
    console.error(e.message);
  }

  const numberIterator = numberGenerator(5);
  const results = await processNumbers(numberIterator);

  print("All numbers processed:", results);
})();
