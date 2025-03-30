 

function* generateTasks() {
  yield 'task1';
  yield 'task2';
  yield 'task3';
}

const processTask = async (task) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (task === 'task2') {
        reject(`Failed processing ${task}`);
      } else {
        resolve(`Successfully processed ${task}`);
      }
    }, 1000);
  });
};

(async function executeTasks() {
  const tasks = generateTasks();
  for (let task of tasks) {
    try {
      let result = await processTask(task);
      print(result);
    } catch (error) {
      console.error(error);
    }
  }
})();

 
 
 
 
 
