 

const asyncTask = (task, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      print(`Task ${task} completed.`);
      resolve(task);
    }, time);
  });
};

(async function executeTasks() {
  const tasks = [
    asyncTask('A', 1000),
    asyncTask('B', 500),
    asyncTask('C', 1200),
  ];

  print('Executing tasks...');
  await Promise.all(tasks);
  print('All tasks completed!');
})();

const handler = {
  get(target, prop) {
    if (prop in target) {
      return Reflect.get(target, prop);
    } else {
      print(`Property ${prop} does not exist.`);
      return undefined;
    }
  }
};

const obj = new Proxy({}, handler);
obj.existingProp = 'I exist!';

print(obj.existingProp);  
print(obj.nonExistingProp);  

const uniqueSym1 = Symbol('unique');
const uniqueSym2 = Symbol('unique');

print(uniqueSym1 === uniqueSym2);  

const symObj = {
  [uniqueSym1]: 'Value for uniqueSym1',
};

print(symObj[uniqueSym1]);  
print(symObj[uniqueSym2]);  
