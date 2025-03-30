 

 
const TASK = Symbol('task');

 
function* taskGenerator() {
  yield { [TASK]: 'Fetch data from server', time: 1000 };
  yield { [TASK]: 'Process data', time: 500 };
  yield { [TASK]: 'Render UI', time: 300 };
}

 
function performTask(task, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      print(`Completed: ${task}`);
      resolve(task);
    }, time);
  });
}

 
async function executeTasks(generator) {
  const iterator = generator();
  for (let taskObj of iterator) {
    await performTask(taskObj[TASK], taskObj.time);
  }
  print('All tasks completed.');
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop === TASK) {
      print(`Accessing task: ${Reflect.get(target, prop, receiver)}`);
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
function proxyTasks(generator) {
  const iterator = generator();
  const tasks = [];
  for (let taskObj of iterator) {
    tasks.push(new Proxy(taskObj, handler));
  }
  return function* () {
    for (let task of tasks) {
      yield task;
    }
  };
}

 
executeTasks(proxyTasks(taskGenerator));
