 
class Fibonacci {
  #previous = 0;
  #current = 1;

  async *[Symbol.asyncIterator]() {
    while (true) {
       
      await new Promise((resolve) => setTimeout(resolve, 100));
      const next = this.#previous + this.#current;
      this.#previous = this.#current;
      this.#current = next;
      yield next;
    }
  }
}

(async () => {
  const fibonacci = new Fibonacci();
  const sequence = fibonacci[Symbol.asyncIterator]();

   
  let fibNumbers = [];
  for await (const num of sequence) {
    fibNumbers.push(num);
    if (fibNumbers.length === 10) break;
  }

   
  print(`First 10 Fibonacci numbers: ${fibNumbers.join(', ')}`);

   
  const target = { message: 'Hello, Proxy!' };
  const handler = {
    get: (obj, prop) => {
      print(`Accessing property: ${prop}`);
      return obj[prop];
    },
  };

  const proxy = new Proxy(target, handler);
  print(proxy.message);

   
  async function fetchData(url) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: `Fetched data from ${url}` });
      }, 500);
    });
  }

  try {
    const data = await fetchData('https://example.com/api');
    print(data.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
