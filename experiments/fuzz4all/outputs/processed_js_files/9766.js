 
import crypto from 'crypto';

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist.`);
    }
  },
  set: (target, prop, value) => {
    if (typeof value === 'number') {
      target[prop] = value;
      return true;
    } else {
      throw new Error(`Property ${prop} must be a number.`);
    }
  }
};

const complexObject = new Proxy({}, handler);

 
const asyncOperation = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomBytes = crypto.randomBytes(4).toString('hex');
      resolve(randomBytes);
    }, 1000);
  });
};

 
function* numberGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
(async () => {
  try {
    complexObject.value = 42;
    print('Complex object value:', complexObject.value);

    const result = await asyncOperation();
    print('Asynchronous operation result:', result);

    print('Generated numbers:');
    for (const num of numberGenerator(1, 5)) {
      print(num);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
