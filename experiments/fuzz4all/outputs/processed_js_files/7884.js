 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

const asyncFib = async (count) => {
  const fib = fibonacci();
  const sequence = [];
  for (let i = 0; i < count; i++) {
    sequence.push(fib.next().value);
  }
  return sequence;
};

const handler = {
  get: async (target, prop) => {
    if (prop in target) {
      return await Promise.resolve(target[prop]);
    } else {
      throw new Error(`Property ${prop} not found`);
    }
  }
};

(async () => {
  const fibProxy = new Proxy({ sequence: await asyncFib(10) }, handler);
  try {
    print(await fibProxy.sequence);
    print(await fibProxy.nonExistent);  
  } catch (error) {
    console.error(error.message);
  }
})();
