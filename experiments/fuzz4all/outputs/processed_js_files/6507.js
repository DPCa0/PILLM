 
(async () => {
  const fs = await import('fs/promises');
  const path = './data.json';

   
  const settings = new Proxy({}, {
    get(target, prop) {
      print(`Getting value of ${prop}`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Setting value of ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  });

   
  async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }

   
  function processItems(...items) {
    items.forEach(({ name, value }) => {
      print(`Processing ${name} with value ${value}`);
    });
  }

   
  class User {
    #name;
    constructor(name) {
      this.#name = name;
    }
    get name() {
      return this.#name;
    }
    set name(newName) {
      print(`Name changed from ${this.#name} to ${newName}`);
      this.#name = newName;
    }
  }

   
  try {
    const data = await fs.readFile(path, 'utf8');
    settings.config = JSON.parse(data);
    print('Config loaded:', settings.config);

     
    const externalData = await fetchData(settings.config?.apiUrl ?? 'https://api.example.com/data');
    print('External data fetched:', externalData);

    processItems(...externalData);

    const user = new User('Alice');
    print(`User created with name: ${user.name}`);
    user.name = 'Bob';

  } catch (error) {
    console.error('Error:', error);
  }
})();
