 
class ComplexFeature {
  #secretValue;
  
  constructor(value) {
    this.#secretValue = value;
  }
  
  get secret() {
    return this.#secretValue;
  }
  
   
  static createInstance(value) {
    return new ComplexFeature(value);
  }
}

 
const handler = {
  get(target, property) {
    print(`Property ${property} has been accessed.`);
    return target[property];
  }
};

const complexInstance = ComplexFeature.createInstance("Hidden");
const proxyInstance = new Proxy(complexInstance, handler);

print(proxyInstance.secret);  

 
async function asyncOperation1() {
  return new Promise((resolve) => setTimeout(() => resolve('Operation 1 Complete'), 1000));
}

async function asyncOperation2() {
  return new Promise((resolve) => setTimeout(() => resolve('Operation 2 Complete'), 500));
}

(async () => {
  const result = await Promise.race([asyncOperation1(), asyncOperation2()]);
  print(result);  
})();

 
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

const sequenceArray = [...generateSequence()];
print(sequenceArray);  

 
const mapExample = new Map();
mapExample.set('a', 1);
mapExample.set('b', 2);
mapExample.set('c', 3);

mapExample.forEach((value, key) => {
  print(`Map value for ${key}: ${value}`);
});
