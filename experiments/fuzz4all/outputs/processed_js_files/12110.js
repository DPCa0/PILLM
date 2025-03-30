 
const asyncOperation = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2 ? resolve('Operation Successful') : reject('Operation Failed');
    }, 1000);
  });

 
const performAsyncTasks = async () => {
  try {
    const result = await asyncOperation();
    print(result);
  } catch (error) {
    console.error(error);
  }
};

 
const target = {
  message: "Hello, Proxy!"
};

const handler = {
  get: (obj, prop) => {
    print(`Accessing ${prop}: ${obj[prop]}`);
    return obj[prop];
  }
};

const proxy = new Proxy(target, handler);
print(proxy.message);

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

const gen = numberGenerator();
print(gen.next().value);
print(gen.next().value);
print(gen.next().value);

 
(() => {
  const { PI, random } = Math;
  const radius = random() * 10;
  print(`Circle with radius ${radius.toFixed(2)} has area ${(PI * radius * radius).toFixed(2)}`);
})();

 
const person = { name: "Alice", age: 30 };
const newPerson = { ...person, location: "Wonderland" };
print(newPerson);

 
(async () => {
  await performAsyncTasks();
  await performAsyncTasks();
  await performAsyncTasks();

  const results = await Promise.allSettled([
    asyncOperation(),
    asyncOperation(),
    asyncOperation()
  ]);
  print(results);
})();
