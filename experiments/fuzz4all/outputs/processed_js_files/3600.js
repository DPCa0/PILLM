class ComplexFeatureDemo {
  #privateValue = 42;  

  constructor() {
    this.name = 'Advanced JavaScript';
  }

  async fetchData() {
     
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      print('Fetched Data:', data);
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }

  *generateSequence() {
     
    let [prev, curr] = [0, 1];
    for (;;) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }

  manipulateSet() {
     
    const uniqueValues = new Set([1, 2, 3, 3, 4, 5]);
    const expandedArray = [...uniqueValues, 6, 7, 8];
    print('Expanded Array:', expandedArray);
  }

  async performOperations() {
     
    await Promise.all([this.fetchData(), this.manipulateSet()]);
  }

  static runDemo() {
    const demo = new ComplexFeatureDemo();
    print('Class Name:', demo.name);

     
    print('Private Value:', demo.#getPrivateValue());

    demo.performOperations();

     
    const sequence = demo.generateSequence();
    print('Fibonacci:', sequence.next().value);
    print('Fibonacci:', sequence.next().value);
    print('Fibonacci:', sequence.next().value);
  }

   
  #getPrivateValue() {
    return this.#privateValue;
  }
}

ComplexFeatureDemo.runDemo();
