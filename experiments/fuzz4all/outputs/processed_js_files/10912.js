 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* taskGenerator(tasks) {
  for (let task of tasks) {
    yield delay(task);
  }
}

 
async function executeTasksConcurrently(taskTimes) {
  const taskIterator = taskGenerator(taskTimes);
  const promises = [];

  for (let taskPromise of taskIterator) {
    promises.push(taskPromise);
  }

   
  const results = await Promise.all(promises.map(promise => promise.then(() => 'Task Complete')));
  return results;
}

 
const executeDynamicTasks = async ([firstDuration, ...otherDurations]) => {
  const results = await executeTasksConcurrently([firstDuration, ...otherDurations]);
  print('All tasks completed:', results);
};

 
const taskDurations = [1000, 500, 1500, 2000, 100];

 
executeDynamicTasks(taskDurations);
