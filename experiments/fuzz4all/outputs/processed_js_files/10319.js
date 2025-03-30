class AsyncHandler {
  constructor() {
    this.tasks = [];
  }

  async executeTasks() {
    await Promise.all(
      this.tasks.map(async (task) => {
        try {
          print(await task());
        } catch (error) {
          console.error(error);
        }
      })
    );
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

class DynamicProxy {
  constructor() {
    return new Proxy(this, {
      get(target, property) {
        if (property in target) {
          return target[property];
        }
        return `Property ${property} does not exist`;
      },
    });
  }

  display(message) {
    print(message);
  }
}

function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

(async () => {
  const asyncHandler = new AsyncHandler();

  asyncHandler.addTask(async () => {
    return new Promise((resolve) => setTimeout(() => resolve('Task 1 Completed'), 1000));
  });

  asyncHandler.addTask(async () => {
    return new Promise((resolve) => setTimeout(() => resolve('Task 2 Completed'), 500));
  });

  asyncHandler.addTask(async () => {
    return new Promise((_, reject) => setTimeout(() => reject('Task 3 Failed'), 700));
  });

  await asyncHandler.executeTasks();

  const dynamicProxy = new DynamicProxy();
  dynamicProxy.display('Using Dynamic Proxy');
  print(dynamicProxy.undefinedProperty);

  const fibonacci = fibonacciGenerator();
  print('First 5 Fibonacci numbers:');
  [...Array(5)].forEach(() => print(fibonacci.next().value));
})();
