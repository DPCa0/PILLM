(async function complexAsyncFunction() {
   
  const asyncTask = (value, shouldResolve) => new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve ? resolve(value) : reject(`Error with value: ${value}`);
    }, Math.random() * 1000);
  });

  const tasks = [
    asyncTask('Task 1', true),
    asyncTask('Task 2', false),
    asyncTask('Task 3', true),
    asyncTask('Task 4', false)
  ];

  try {
    const results = await Promise.allSettled(tasks);

     
    const { resolved, rejected } = results.reduce((acc, result) => {
      result.status === 'fulfilled'
        ? acc.resolved.push(result.value)
        : acc.rejected.push(result.reason);
      return acc;
    }, { resolved: [], rejected: [] });

     
    const handler = {
      get(target, property) {
        print(`Accessed property: ${property}`);
        return target[property];
      }
    };

    const wrappedResults = new Proxy({ resolved, rejected }, handler);

    print('Resolved:', wrappedResults.resolved);
    print('Rejected:', wrappedResults.rejected);
  } catch (error) {
    console.error('Caught Error:', error);
  }
})();
