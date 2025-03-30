 

 
function* taskGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve('Task 1 completed'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Task 2 completed'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Task 3 completed'), 1000));
}

 
async function runTasks(generator) {
  for (let task of generator()) {
    print(await task);
  }
}

 
const taskRunner = {
  run: async (generator) => {
    print('Running tasks...');
    await runTasks(generator);
    print('All tasks completed');
  }
};

const proxyRunner = new Proxy(taskRunner, {
  get(target, prop) {
    print(`Accessing ${prop} method`);
    return target[prop];
  }
});

proxyRunner.run(taskGenerator);
