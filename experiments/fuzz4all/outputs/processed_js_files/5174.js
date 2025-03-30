 
const fetchData = async (url) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return Reflect.get(target, property);
  }
};

const dataHandler = (async () => {
  try {
    const data = await fetchData('https://example.com');
    print(data);

    const obj = new Proxy({ id: 1, name: 'Alice' }, handler);

     
    print(obj?.name ?? 'Default Name');
    print(obj?.age ?? 'Unknown Age');

     
    function* idGenerator() {
      let id = 1;
      while (true) {
        yield id++;
      }
    }

    const generator = idGenerator();
    print(generator.next().value);
    print(generator.next().value);

     
    const { add } = await import('./mathUtils.js');
    print(`3 + 5 = ${add(3, 5)}`);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

 
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}

const user = new User('Bob');
print(user.getName());
