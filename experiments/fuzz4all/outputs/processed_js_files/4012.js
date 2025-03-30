 
import _ from 'lodash';

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 22 },
        { id: 3, name: 'Charlie', age: 32 },
        { id: 4, name: 'David', age: 24 }
      ]);
    }, 1000);
  });
}

 
function* taskGenerator(tasks) {
  for (const task of tasks) {
    yield task();
  }
}

 
const log = (message) => {
  print(`[${new Date().toISOString()}] ${message}`);
};

 
const handleTask = async (task) => {
  try {
    log(`Starting task...`);
    const result = await task;
    log(`Task completed: ${JSON.stringify(result)}`);
  } catch (error) {
    log(`Error encountered: ${error.message}`);
  }
};

 
async function main() {
  log('Starting program');
  const data = await fetchData();

   
  const adults = _.chain(data)
    .filter((user) => user.age >= 25)
    .map((user) => `${user.name} is ${user.age} years old`)
    .value();

  log(`Processed data: ${JSON.stringify(adults)}`);

  const tasks = [
    async () => await fetchData(),
    async () => await Promise.resolve('A simple resolved promise')
  ];

  const taskGen = taskGenerator(tasks);

  for (const task of taskGen) {
    await handleTask(task);
  }

  log('Program completed');
}

main();
