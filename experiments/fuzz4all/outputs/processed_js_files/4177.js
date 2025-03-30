 

 
function asyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 10);
      if (randomNum < 8) {
        resolve(randomNum);
      } else {
        reject('Random number too high!');
      }
    }, 1000);
  });
}

 
async function executeTask() {
  try {
    const result = await asyncTask();
    print(`Task completed with result: ${result}`);
  } catch (error) {
    console.error(`Task failed: ${error}`);
  }
}

 
const handler = {
  get(target, propKey) {
    print(`Getting property ${propKey}`);
    return target[propKey];
  },
  set(target, propKey, value) {
    print(`Setting property ${propKey} to ${value}`);
    target[propKey] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);
obj.message = 'Hello, Proxies!';
print(obj.message);

 
executeTask();
