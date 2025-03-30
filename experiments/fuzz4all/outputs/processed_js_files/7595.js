 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function processTasks(tasks) {
  for (const task of tasks) {
    const { id, execute } = task;
    print(`Processing task ${id}...`);
    await execute();
    print(`Task ${id} completed.`);
  }
}

 
const taskMapHandler = {
  get(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const taskMap = new Proxy(new Map(), taskMapHandler);

 
taskMap.set(1, {
  id: 1,
  execute: async () => {
    await delay(1000);
    print('Task 1 executing');
  },
});

taskMap.set(2, {
  id: 2,
  execute: async () => {
    await delay(1500);
    print('Task 2 executing');
  },
});

 
(async () => {
  const tasks = [...taskMap.values()];
  await processTasks(tasks);
})();
