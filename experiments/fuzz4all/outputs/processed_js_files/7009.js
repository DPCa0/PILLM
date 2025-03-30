 

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const createAsyncTask = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2 ? resolve(`Task ${id} completed`) : reject(`Task ${id} failed`);
    }, Math.random() * 2000);
  });
};

const asyncTaskManager = async function* (numTasks) {
  const generator = idGenerator();

  while (numTasks--) {
    const id = generator.next().value;
    try {
      const result = await createAsyncTask(id);
      yield result;
    } catch (error) {
      yield error;
    }
  }
};

const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Accessing property ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  }
};

const tasks = new Proxy({
  taskCount: 5
}, handler);

(async () => {
  const manager = asyncTaskManager(tasks.taskCount);

  for await (let result of manager) {
    print(result);
  }
})();
