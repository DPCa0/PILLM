 

 
const _secretKey = Symbol('secret');

 
class ComplexStructure {
  #privateValue;

  constructor(initialValue) {
    this.#privateValue = initialValue;
    this[_secretKey] = 'top-secret';
  }

   
  *fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }

   
  async asyncOperation() {
    const result = await new Promise((resolve) => setTimeout(() => resolve(this.#privateValue * 2), 1000));
    return result;
  }

   
  static getNestedProperty(obj, path) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj) ?? 'Default Value';
  }
}

 
const complexInstance = new ComplexStructure(42);

 
print('Fibonacci Sequence:');
for (let num of complexInstance.fibonacci(5)) {
  print(num);
}

 
complexInstance.asyncOperation().then(result => print(`Async Operation Result: ${result}`));

 
const nestedObject = { a: { b: { c: 'value' } } };
print('Nested Property:', ComplexStructure.getNestedProperty(nestedObject, 'a.b.c'));
print('Non-Existent Property:', ComplexStructure.getNestedProperty(nestedObject, 'a.x.y'));

