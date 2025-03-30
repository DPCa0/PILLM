 
const complexJSFeaturesDemo = () => {
   
  const [first, second, ...rest] = [1, 2, 3, 4, 5, 6];
  print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

   
  const greet = (name) => `Hello, ${name}!`;
  print(greet("Alice"));

   
  class Animal {
    static species = 'Mammal';  

    #name;  
    constructor(name) {
      this.#name = name;
    }

    get name() {
      return this.#name;
    }

    static classify() {
      return `This is a ${this.species}.`;
    }
  }

  const dog = new Animal('Dog');
  print(dog.name);  
  print(Animal.classify());  

   
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      print('Fetched data:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  fetchData('https://jsonplaceholder.typicode.com/todos/1');

   
  const targetObject = { message: "Hello, Proxy!" };
  const handler = {
    get: function(target, property) {
      print(`Accessing property ${property}`);
      return target[property];
    }
  };
  const proxy = new Proxy(targetObject, handler);
  print(proxy.message);

   
  function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
  
  print([...fibonacci(10)]);  
};

complexJSFeaturesDemo();
