 
(async () => {
  const fs = await import('fs/promises');

   
  function* generateNumbers(limit) {
    for (let i = 1; i <= limit; i++) {
      yield i;
    }
  }

   
  async function processNumbers() {
    const numbers = generateNumbers(10);
    const results = [];

    for await (const num of numbers) {
       
      const proxyObj = new Proxy({ value: num }, {
        get(target, prop) {
          print(`Accessing property "${prop}" of`, target);
          return Reflect.get(target, prop);
        }
      });

       
      const message = log`Number is ${proxyObj.value}`;
      results.push(message);
    }

    await fs.writeFile('numbers.txt', results.join('\n'), 'utf-8');
  }

   
  function log(strings, value) {
    return `${strings[0]} ${value}`;
  }

   
  processNumbers().then(() => print('Numbers processed and saved.'));
})();
