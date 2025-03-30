 

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const delayedSquare = async (num) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * num;
};

const createAsyncSequence = async function* (start, end) {
  for (let number of range(start, end)) {
    const squared = await delayedSquare(number);
    yield squared;
  }
};

const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessed property ${property}`);
      return target[property];
    }
    return `Property ${property} does not exist.`;
  },
};

const obj = new Proxy({ a: 1, b: 2, c: 3 }, handler);

const printSquares = async ({ start, end }) => {
  const sequence = createAsyncSequence(start, end);
  for await (let value of sequence) {
    print(value);
  }
};

const [start, end] = [1, 5];

print(obj.a);  
print(obj.z);  

printSquares({ start, end });
