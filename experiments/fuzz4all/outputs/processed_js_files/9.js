 
(async () => {
  const fs = await import('fs/promises');

   
  function* primeGenerator() {
    let num = 2;
    outer: while (true) {
      for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) {
          num++;
          continue outer;
        }
      }
      yield num++;
    }
  }

   
  const handler = {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        print(`Property "${prop}" does not exist.`);
        return undefined;
      }
    }
  };

  const primesProxy = new Proxy({ description: 'Prime numbers generator' }, handler);

   
  async function writePrimesToFile(count) {
    const primes = [];
    const generator = primeGenerator();
    for (let i = 0; i < count; i++) {
      primes.push(generator.next().value);
    }
    
    const data = `Prime Numbers: ${primes.join(', ')}\n`;
    
    try {
      await fs.writeFile('primes.txt', data);
      print(`Successfully wrote ${count} prime numbers to file.`);
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }

   
  print(`About: ${primesProxy.description}`);
  await writePrimesToFile(10);
  print(`Description: ${primesProxy.notExist}`);  
})();
