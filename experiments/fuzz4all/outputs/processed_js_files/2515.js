 
function randomTimeoutPromise(id) {
  return new Promise((resolve, reject) => {
    const time = Math.floor(Math.random() * 3000);
    setTimeout(() => resolve(`Resolved: ${id} after ${time} ms`), time);
  });
}

 
async function executeAsyncTasks() {
  const tasks = [1, 2, 3, 4, 5].map(id => randomTimeoutPromise(id));

   
  async function* asyncIterable(tasks) {
    for (let task of tasks) {
      yield await task;
    }
  }

   
  for await (const result of asyncIterable(tasks)) {
    print(result);
  }

  print('All tasks completed');
}

 
function compose(...funcs) {
  return function(initialValue) {
    return funcs.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}

const double = x => x * 2;
const square = x => x * x;

 
const squareAndDouble = compose(double, square);

print(`Square and double 3: ${squareAndDouble(3)}`);

 
executeAsyncTasks();
