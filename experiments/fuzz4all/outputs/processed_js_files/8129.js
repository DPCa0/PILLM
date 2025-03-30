 
(async () => {
   
  const handler = {
    set(target, property, value) {
      print(`Property ${property} set to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const reactiveObject = new Proxy({ count: 0 }, handler);

   
  async function* asyncCounter() {
    while (reactiveObject.count < 3) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield ++reactiveObject.count;
    }
  }

   
  for await (let value of asyncCounter()) {
    print(`Count: ${value}`);
  }

   
  const user = {
    name: 'Alice',
    preferences: {
      theme: 'dark'
    }
  };

  const theme = user?.preferences?.theme ?? 'light';
  print(`Theme: ${theme}`);

   
  function highlight(strings, ...values) {
    return strings.reduce((prev, curr, i) => `${prev}<strong>${values[i - 1]}</strong>${curr}`);
  }

  const language = 'JavaScript';
  print(highlight`I love coding in ${language}!`);
})();
