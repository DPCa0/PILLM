class ComplexFeatureDemo {
  #privateField = 'private value';  

  constructor() {
    this.dynamicMethodName = 'computedMethod';
  }

  static *staticGenerator() {
    yield* ['Hello', 'from', 'static', 'generator'];
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

  getPrivateField() {
    return this.#privateField;
  }

  [this.dynamicMethodName]() {  
    return 'This is a computed method.';
  }

  *objectGenerator() {
    yield* {
      name: 'Advanced JS',
      features: ['classes', 'async/await', 'generators', 'modules'],
      isComplex: true
    };
  }

  static async demo() {
    const demoInstance = new ComplexFeatureDemo();

    print('Private Field:', demoInstance.getPrivateField());

    for (const word of ComplexFeatureDemo.staticGenerator()) {
      print(word);
    }

    for (const [key, value] of demoInstance.objectGenerator()) {
      print(`${key}: ${value}`);
    }

    print('Computed Method:', demoInstance[demoInstance.dynamicMethodName]());

    const data = await demoInstance.fetchData('https://api.example.com/data');
    print('Fetched Data:', data);
  }
}

ComplexFeatureDemo.demo();
