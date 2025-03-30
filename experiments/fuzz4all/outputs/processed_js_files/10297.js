 
(async () => {
  const fs = await import('fs/promises');

   
  const data = { name: 'Alice', age: 30 };
  const handler = {
    get(target, property) {
      print(`Getting ${property}`);
      return target[property];
    },
    set(target, property, value) {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const proxyData = new Proxy(data, handler);

   
  function parse(strings, ...values) {
    return strings.reduce((result, string, i) => {
      const value = values[i] ? `[${values[i]}]` : '';
      return result + string + value;
    }, '');
  }

  const userInfo = parse`Name: ${proxyData.name}, Age: ${proxyData.age}`;

  print(userInfo);  

   
  proxyData.age = 31;  

   
  async function fetchData() {
    return new Promise((resolve) => setTimeout(() => resolve(proxyData), 1000));
  }

  const updatedData = await fetchData();
  print(`Updated Data: ${JSON.stringify(updatedData)}`);

   
  const complexObject = {
    preferences: {
      theme: 'dark'
    }
  };
  
  const userTheme = complexObject.preferences?.theme ?? 'default';
  print(`User theme: ${userTheme}`);

   
  await fs.writeFile('output.txt', userInfo);

  print('Program completed successfully.');

})();
