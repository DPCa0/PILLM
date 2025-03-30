 
(async () => {
  const { default: _ } = await import('lodash');

   
  const target = { language: 'JavaScript', level: 'advanced' };
  const handler = {
    get: (obj, prop) => {
      print(`Accessing property "${prop}"`);
      return obj[prop];
    }
  };
  const proxy = new Proxy(target, handler);

   
  function* dataGenerator() {
    yield* Object.entries(proxy);
  }

   
  const asyncTask = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Processed: ${JSON.stringify(data)}`);
      }, 1000);
    });
  };

   
  async function processAllData(generator) {
    const tasks = [];
    for (const entry of generator) {
      tasks.push(asyncTask(entry));
    }

    const results = await Promise.allSettled(tasks);
    results.forEach(result => print(result.value || result.reason));
  }

   
  const formatOutput = (strings, ...values) =>
    strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? `<${values[i]}>` : ''}`, '');

  const message = formatOutput`Data processing ${'start'} to ${'end'}`;
  print(message);

   
  await processAllData(dataGenerator());

   
  const clonedObject = _.cloneDeep(proxy);
  clonedObject.level = 'expert';
  print('Original Level:', proxy.level);
  print('Cloned Level:', clonedObject.level);
})();
