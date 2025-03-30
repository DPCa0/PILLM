 
class AdvancedFeatures {
  constructor() {
    this.generator = this.createGenerator();
    this.proxy = this.createProxy();
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async* createGenerator() {
    let counter = 0;
    while (true) {
      const result = await new Promise((resolve) =>
        setTimeout(() => resolve(counter++), 1000)
      );
      yield result;
    }
  }

  createProxy() {
    const handler = {
      get(target, property) {
        print(`Getting ${property}`);
        return Reflect.get(target, property);
      },
      set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value);
      },
    };

    const targetObject = { a: 1, b: 2 };
    return new Proxy(targetObject, handler);
  }
}

(async () => {
  const advanced = new AdvancedFeatures();

   
  const generator = advanced.generator;
  for (let i = 0; i < 3; i++) {
    print('Generated:', await generator.next().value);
  }

   
  print('Proxy a:', advanced.proxy.a);
  advanced.proxy.a = 10;
  print('Proxy a after set:', advanced.proxy.a);

   
  const data = await advanced.fetchData('https://api.github.com');
  print('Fetched data:', data);
})();
