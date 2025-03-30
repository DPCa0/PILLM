class LazyEvaluator {
  constructor(generatorFunc) {
    this.generatorFunc = generatorFunc;
    this.iterable = this.generatorFunc();
  }

  next() {
    return this.iterable.next().value;
  }

  map(fn) {
    const gen = this.generatorFunc;
    this.generatorFunc = function* () {
      for (const val of gen()) {
        yield fn(val);
      }
    };
    this.iterable = this.generatorFunc();
    return this;
  }

  filter(fn) {
    const gen = this.generatorFunc;
    this.generatorFunc = function* () {
      for (const val of gen()) {
        if (fn(val)) yield val;
      }
    };
    this.iterable = this.generatorFunc();
    return this;
  }
}

 
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const lazyFib = new LazyEvaluator(fibonacci);

 
let result = [];
lazyFib
  .filter(x => x % 2 === 0)
  .map(x => x * x);

for (let i = 0; i < 10; i++) {
  result.push(lazyFib.next());
}

print(result);
