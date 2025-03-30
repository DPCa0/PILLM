class ComplexFeatures {
  #privateValue = 42;

  constructor(name) {
    this.name = name;
    this.meta = {
      [Symbol('id')]: Symbol('unique'),
    };
  }

  async* asyncGenerator() {
    let i = 0;
    while (i < 3) {
      yield await this.#privateMethod(i++);
    }
  }

  #privateMethod(i) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Private Value: ${this.#privateValue + i}`), 1000);
    });
  }

  *lazyEvaluation() {
    yield* [1, 2, 3].map((n) => n * 2);
  }

  get metaInfo() {
    return Reflect.ownKeys(this.meta);
  }

  static dynamicImportDemo() {
    import('./anotherModule.js')
      .then((module) => module.someFunction())
      .catch((err) => console.error('Import failed', err));
  }
}

const complexObj = new ComplexFeatures('JS Enthusiast');

(async () => {
  print(`Hello, ${complexObj.name}`);
  print('Meta Info:', complexObj.metaInfo);

  for await (const value of complexObj.asyncGenerator()) {
    print(value);
  }

  print('Lazy Evaluation:', [...complexObj.lazyEvaluation()]);

   
   
})();
