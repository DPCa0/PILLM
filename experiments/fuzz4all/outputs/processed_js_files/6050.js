 
(async () => {
  const { default: _ } = await import('lodash');

   
  const state = new Proxy({ value: 42 }, {
    set(target, property, value) {
      print(`State change: ${property} = ${value}`);
      target[property] = value;
      return true;
    }
  });

   
  function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

   
  async function processData({ data, ...rest }) {
    const results = await Promise.all(data.map(async item => {
      await new Promise(resolve => setTimeout(resolve, 100));  
      return _.capitalize(item);
    }));
    return { results, ...rest };
  }

   
  const config = { options: { debug: true } };
  const debugMode = config.options?.debug ?? false;
  print(`Debug mode is ${debugMode ? 'on' : 'off'}`);

   
  const fibSeq = fibonacci();
  print('First 5 Fibonacci numbers:', [fibSeq.next().value, fibSeq.next().value, fibSeq.next().value, fibSeq.next().value, fibSeq.next().value]);

   
  const processed = await processData({ data: ['apple', 'banana', 'cherry'], metadata: { created: Date.now() } });
  print('Processed data:', processed);

   
  state.value = 100;
})();
