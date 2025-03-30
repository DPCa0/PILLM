(async function advancedFeaturesShowcase() {
   
  const handler = {
    get(target, property) {
      print(`Property '${property}' accessed`);
      return target[property];
    },
  };

  const targetObject = { greeting: 'Hello', subject: 'world' };
  const proxy = new Proxy(targetObject, handler);

   
  const getJoke = async () => {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    return data.value;
  };

   
  function* taskManager() {
    yield `First Task: ${proxy.greeting}, ${proxy.subject}!`;
    yield `Second Task: Here's a joke - ${await getJoke()}`;
  }

  // Execute tasks
  const tasks = taskManager();
  for (const task of tasks) {
    print(task);
  }

  // Using Set and Array methods with spread syntax
  const uniqueNumbers = new Set([1, 2, 3, 3, 4, 5, 6, 6]);
  print('Unique Numbers:', [...uniqueNumbers]);

  // Using map and filter with chaining
  const squaredNumbers = [...uniqueNumbers]
    .map(num => num ** 2)
    .filter(num => num > 10);
  print('Squared and filtered numbers:', squaredNumbers);

   
  const { a = 42, b = 100 } = { a: 1 };
  print(`Destructured Values: a = ${a}, b = ${b}`);
})();
