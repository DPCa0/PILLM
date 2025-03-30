 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* asyncGenerator() {
  yield delay(1000).then(() => print('Step 1 complete'));
  yield delay(500).then(() => print('Step 2 complete'));
  yield delay(2000).then(() => print('Step 3 complete'));
}

 
async function runGenerator(gen) {
  for (let promise of gen()) {
    await promise;
  }
  print('All steps completed');
}

 
const targetObject = {a: 1, b: 2, c: 3};
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed with value: ${target[property]}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Property '${property}' set to value: ${value}`);
    target[property] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);

 
proxy.a;   
proxy.b = 10;   

 
runGenerator(asyncGenerator);
