class Vector {
  constructor(...components) {
    this.components = components;
  }

   
  add(vector) {
    if (vector.components.length !== this.components.length) 
      throw new Error('Vectors must have the same dimension');
    return new Vector(...this.components.map((val, idx) => val + vector.components[idx]));
  }

   
  multiply(scalar) {
    return new Vector(...this.components.map(val => val * scalar));
  }

   
  *[Symbol.iterator]() {
    yield* this.components;
  }

   
  get magnitude() {
    return Math.sqrt(this.components.reduce((sum, val) => sum + val ** 2, 0));
  }

   
  static fromArray(arr) {
    const vector = new Vector(...arr);
    return vector.multiply(1 / vector.magnitude);
  }
}

(async () => {
   
  const vector1 = new Vector(1, 2, 3);
  const vector2 = new Vector(4, 5, 6);
  
  const promise1 = Promise.resolve(vector1.add(vector2));
  const promise2 = Promise.resolve(vector2.multiply(2));
  
  const [result1, result2] = await Promise.all([promise1, promise2]);
  
  print('Result1 Components:', [...result1]);
  print('Result1 Magnitude:', result1.magnitude);
  print('Result2 Components:', [...result2]);
  print('Result2 Magnitude:', result2.magnitude);
  
  const unitVector = Vector.fromArray([3, 4]);
  print('Unit Vector Components:', [...unitVector]);
})();
