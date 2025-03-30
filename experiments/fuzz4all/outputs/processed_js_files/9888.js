 

 
const _id = Symbol('id');

class Task {
  constructor(name) {
    this.name = name;
    this[_id] = Math.floor(Math.random() * 10000);
  }

  getId() {
    return this[_id];
  }
}

 
const handler = {
  get(target, prop) {
    print(`Accessing property '${prop}'`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(...arguments);
  }
};

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
}

(async () => {
  const taskGenerator = idGenerator();
  
  const tasks = new Proxy([], handler);

   
  for (let i = 0; i < 3; i++) {
    const task = new Task(`Task ${taskGenerator.next().value}`);
    tasks.push(task);
  }

   
  print(tasks[0].getId());
  tasks[0].name = "Updated Task 0";

   
  const data = await fetchData();
  print(data);
})();
