 

function* generateNumbers() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

const numberGenerator = generateNumbers();

const asyncOperation = (num) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (num % 2 === 0) {
      resolve(`Even number: ${num}`);
    } else {
      reject(`Odd number: ${num}`);
    }
  }, 1000);
});

const numberHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property ${prop} does not exist.`;
    }
  }
};

const numbers = new Proxy({}, numberHandler);

async function processNumbers() {
  try {
    for (let i = 0; i < 5; i++) {
      const { value } = numberGenerator.next();
      numbers.current = value;
      const message = await asyncOperation(value);
      print(message);
    }
  } catch (error) {
    console.error(error);
  }
}

processNumbers();
