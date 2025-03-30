(async () => {
   
  const handler = {
    get(target, prop, receiver) {
      print(`Getting the property '${prop}'`);
      return Reflect.get(...arguments);
    },
    set(target, prop, value) {
      print(`Setting the property '${prop}' to '${value}'`);
      return Reflect.set(...arguments);
    }
  };

  const data = { message: "Hello" };
  const proxy = new Proxy(data, handler);
  proxy.message = "Hello, Proxy!";
  print(proxy.message);

   
  function* generatorFunction() {
    yield 'First output';
    yield* anotherGenerator();
    yield 'Last output';
  }

  function* anotherGenerator() {
    yield 'Nested output 1';
    yield 'Nested output 2';
  }

  for (const value of generatorFunction()) {
    print(value);
  }

   
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      print(data);
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }

   
  function tag(strings, ...values) {
    print('Tag function called with:', strings, values);
    return strings.reduce((result, str, i) => `${result}${str}${values[i] ? values[i] : ''}`, '');
  }

  const userName = 'Alice';
  const userMessage = tag`Hello, ${userName}! Welcome to the advanced JavaScript example.`;

   
  (function display() {
    print('This message is from an IIFE');
  })();

   
  const settings = { theme: { color: 'dark' } };
  const userColor = settings?.theme?.color ?? 'default-color';
  print(`User color setting: ${userColor}`);

   
  fetchData('https://api.github.com/users/github');
})();
