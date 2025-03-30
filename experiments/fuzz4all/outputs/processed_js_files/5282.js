 

 
function* asyncNumberGenerator() {
  let num = 1;
  while (num <= 3) {
    yield getNumber(num);
    num++;
  }
}

 
function getNumber(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (n > 0) {
        resolve(n);
      } else {
        reject('Invalid number');
      }
    }, 1000 * n);  
  });
}

 
async function handleNumbers() {
  const gen = asyncNumberGenerator();
  for (const promise of gen) {
    try {
      const number = await promise;  
      print(`Received number: ${number}`);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
  get: (target, prop, receiver) => {
    print(`Property '${prop}' has been accessed.`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' set to '${value}'.`);
    return Reflect.set(target, prop, value);
  },
};

const proxy = new Proxy(targetObject, handler);

 
proxy.a;  
proxy.b = 42;  

 
handleNumbers();
