 
class SecretBox {
  #secret;

  constructor(secret) {
    this.#secret = secret;
  }

  revealSecret() {
    return `The secret is: ${this.#secret}`;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property.startsWith('_')) {
      throw new Error('Access to private properties is denied');
    }
    return target[property];
  },
};

const box = new Proxy(new SecretBox('42 is the answer'), handler);

 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
async function simulateAsyncOperation() {
  return new Promise((resolve) => {
    setTimeout(() => {
      print('Async operation completed');
      resolve();
    }, 1000);
  });
}

 
(async () => {
  try {
    print(box.revealSecret());

    print('Fibonacci sequence up to 21:');
    for (const num of fibonacci(21)) {
      print(num);
    }

    await simulateAsyncOperation();
  } catch (error) {
    console.error(error.message);
  }
})();
