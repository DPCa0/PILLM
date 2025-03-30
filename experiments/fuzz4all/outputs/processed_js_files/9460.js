 
(async () => {
  const { default: axios } = await import('https://cdn.skypack.dev/axios');
  
   
  const handler = {
    get(target, prop, receiver) {
      if (prop in target) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
      } else {
        return `Property ${prop} not found`;
      }
    },
    set(target, prop, value) {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    }
  };

  const targetObject = { language: 'JavaScript' };
  const proxy = new Proxy(targetObject, handler);

  print(proxy.language);  
  proxy.language = 'ECMAScript';  
  print(proxy.framework);  

   
  class Greeter {
    #greeting = 'Hello';

    #greet() {
      return `${this.#greeting}, world!`;
    }

    greetWorld() {
      return this.#greet();
    }
  }

  const greeter = new Greeter();
  print(greeter.greetWorld());

   
  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      print(`Fetched data: `, response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   
  fetchData('https://api.github.com');
})();
