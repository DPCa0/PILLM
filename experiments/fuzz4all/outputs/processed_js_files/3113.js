 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function asyncProcess(item) {
  await delay(500);
  return `Processed ${item}`;
}

 
function* taskGenerator(tasks) {
  for (const task of tasks) {
    yield asyncProcess(task);
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const monitoredObject = new Proxy({ taskCount: 0 }, handler);

 
async function processTasks(tasks) {
  const generator = taskGenerator(tasks);
  for (const promise of generator) {
    const result = await promise;
    print(result);
    monitoredObject.taskCount++;
  }
}

const tasks = ["Task1", "Task2", "Task3"];
processTasks(tasks).then(() => {
  print(`All tasks completed. Total: ${monitoredObject.taskCount}`);
});
