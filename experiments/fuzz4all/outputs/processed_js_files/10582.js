 
const data = new Map([
  ['name', 'Alice'],
  ['age', 30],
  ['location', 'Wonderland'],
]);

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'greet') {
      return `Hello, my name is ${target.get('name')}`;
    }
    return Reflect.get(...arguments);
  },
  set: (target, prop, value, receiver) => {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    return Reflect.set(...arguments);
  }
};

const proxyData = new Proxy(data, handler);

 
function updateAge(newAge) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        proxyData.set('age', newAge);
        resolve(`Age updated to ${proxyData.get('age')}`);
      } catch (error) {
        reject(error.message);
      }
    }, 1000);
  });
}

 
async function run() {
  print(proxyData.greet);
  
  try {
    const result = await updateAge(25);
    print(result);
  } catch (error) {
    console.error(error);
  }

  try {
    await updateAge('unknown');  
  } catch (error) {
    console.error(error);
  }
}

run();
