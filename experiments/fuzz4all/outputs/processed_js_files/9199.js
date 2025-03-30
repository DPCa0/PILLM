 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* taskGenerator(tasks) {
  for (const task of tasks) {
    yield task();
  }
}

 
async function runTasks(taskGen) {
  for (const task of taskGen) {
    print(`Starting task at ${new Date().toISOString()}`);
    await task;
    print(`Finished task at ${new Date().toISOString()}`);
  }
}

 
const tasks = [
  async () => { await delay(1000); print('Task 1 completed'); },
  async () => { await delay(2000); print('Task 2 completed'); },
  async () => { await delay(1500); print('Task 3 completed'); },
];

 
const taskSequence = taskGenerator(tasks);
runTasks(taskSequence);

 
class DataHandler {
  constructor(data) {
    this.data = data;
    return new Proxy(this, {
      get(target, prop) {
        print(`Getting property '${prop}'`);
        return target[prop];
      },
      set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
      }
    });
  }

  updateData(newData) {
    Object.assign(this.data, newData);
  }
}

 
const handler = new DataHandler({ name: 'Alice', age: 30 });
print(handler.data.name);  
handler.updateData({ age: 31 });
print(handler.data.age);   
handler.data.name = 'Bob';       
