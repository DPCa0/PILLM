 

 
const asyncCompute = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value * 2);
    }, 1000);
  });
};

 
function* taskGenerator(tasks) {
  for (const task of tasks) {
    yield asyncCompute(task);
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property ${prop}`);
    return target[prop];
  },
};

 
const complexObj = {
  nested: {
    deep: {
      value: 42,
    },
  },
};

 
const proxiedObj = new Proxy(complexObj, handler);

 
const executeTasks = async (tasks) => {
  const taskGen = taskGenerator(tasks);
  const results = [];

  for (let task of taskGen) {
    results.push(await task);
  }

  print('Computed results:', results);
};

 
(async () => {
   
  const value = proxiedObj.nested.deep.value;
  print('Original Value:', value);

   
  await executeTasks([1, 2, 3, value]);
})();
