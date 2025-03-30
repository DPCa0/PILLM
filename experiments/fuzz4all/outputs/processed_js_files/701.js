 
class ComplexFeatureDemo {
  #privateField;

  constructor(initialValue) {
    this.#privateField = initialValue;
  }

  #privateMethod() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.#privateField * 2);
      }, 1000);
    });
  }

  async getDoubleOfPrivateField() {
    try {
      const result = await this.#privateMethod();
      return result;
    } catch (error) {
      console.error('Error computing double:', error);
    }
  }
}

 
(async () => {
  const complexDemo = new ComplexFeatureDemo(21);
  const [result, ...extras] = await Promise.all([
    complexDemo.getDoubleOfPrivateField(),
    Promise.resolve('Extra value 1'),
    Promise.resolve('Extra value 2')
  ]);

  print(`Double of private field is: ${result}`);
  print('Extra values:', ...extras);
})();
