 

 
import { performance } from 'perf_hooks';

 
const handler = {
  get: (obj, prop) => {
    print(`Property "${prop}" has been accessed`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Property "${prop}" is being set to "${value}"`);
    obj[prop] = value;
    return true;
  },
};

const observedObject = new Proxy({ name: "AdvancedJS" }, handler);

 
const asyncTask = async () => {
  return new Promise((resolve) => setTimeout(() => resolve("Task Complete"), 1000));
};

const executeTasks = async () => {
  const startTime = performance.now();
  const result = await asyncTask();
  const endTime = performance.now();
  print(result);
  print(`Execution time: ${(endTime - startTime).toFixed(2)} milliseconds`);
};

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

 
const complexObj = {
  ['dynamic' + 'Property']: 42,
  getUniqueId() {
    return idGen.next().value;
  },
};

 
observedObject.name = "JS Mastery";
print(observedObject.name);

executeTasks().then(() => {
  print(`Generated Unique ID: ${complexObj.getUniqueId()}`);
  print(`Computed Property Value: ${complexObj.dynamicProperty}`);
});
