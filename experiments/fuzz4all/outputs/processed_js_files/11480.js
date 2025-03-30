 
(async () => {
  const [{ random, floor }, { default: axios }, { Observable }] = await Promise.all([
    import('mathjs'),
    import('axios'),
    import('rxjs')
  ]);

   
  const handler = {
    get: (target, prop) => prop in target ? target[prop] : `Property ${prop} not found!`
  };

  const target = { name: "JavaScript" };
  const proxy = new Proxy(target, handler);

   
  async function* fetchData(url) {
    try {
      const response = await axios.get(url);
      yield response.data;
    } catch (error) {
      yield `Error: ${error.message}`;
    }
  }

   
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const observable = new Observable(async (subscriber) => {
    for await (const data of fetchData(url)) {
      subscriber.next(data);
    }
    subscriber.complete();
  });

  observable.subscribe({
    next(x) { print('Received:', x); },
    complete() { print('Fetch complete'); }
  });

   
  const randomNumber = random();
  print(`Random Number (0 to 1): ${randomNumber}`);
  print(`Floored Random Number: ${floor(randomNumber * 100)}`);

   
  print(`Proxy Access: ${proxy.name}`);
  print(`Proxy Non-existent Access: ${proxy.age}`);
})();
