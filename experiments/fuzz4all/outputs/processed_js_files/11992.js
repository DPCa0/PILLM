 
 
 
 
 

 
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
const setHandler = {
  add: (target, value) => {
    print(`Adding ${value} to the set`);
    return target.add(value);
  }
};

let numberSet = new Set();
let proxiedSet = new Proxy(numberSet, {
  get(target, prop, receiver) {
    if (prop === 'add') {
      return new Proxy(target[prop], {
        apply(target, thisArg, argumentsList) {
          return setHandler.add(target, ...argumentsList);
        }
      });
    }
    return Reflect.get(target, prop, receiver);
  }
});

(async function main() {
  const numGen = numberGenerator();
  
  for (let i = 0; i < 5; i++) {
    const num = numGen.next().value;
    proxiedSet.add(num);
    await delay(1000);  
  }

  print("Final Set:", [...proxiedSet]);
})();
