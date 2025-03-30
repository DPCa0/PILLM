 

 
const asyncTask = (message, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Completed: ${message}`), delay);
  });
};

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessed property: ${property}`);
      return target[property];
    } else {
      console.warn(`Property ${property} does not exist!`);
      return undefined;
    }
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const targetObject = { task1: 'Read', task2: 'Write' };
const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
  try {
     
    print(proxyObject.task1);
    proxyObject.task3 = 'Code';

     
    const results = await Promise.all([
      asyncTask(proxyObject.task1, 1000),
      asyncTask(proxyObject.task2, 500),
      asyncTask(proxyObject.task3, 1500)
    ]);

     
    print(`Results:\n${results.join('\n')}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
