class FluentArray extends Array {
  constructor(...args) {
    super(...args);
    this
      .map(el => el * 2)
      .filter(el => el > 5)
      .forEach((el, idx) => this[idx] = el);
  }

  static fromGenerator(generator) {
    return new FluentArray(...Array.from(generator()));
  }

  toAsyncIterable() {
    return {
      [Symbol.asyncIterator]: async function* () {
        for (let i = 0; i < this.length; i++) {
          yield await Promise.resolve(this[i]);
        }
      }.bind(this),
    };
  }
}

const generator = function* () {
  yield* [1, 2, 3, 4, 5];
};

(async () => {
  const fluentArray = FluentArray.fromGenerator(generator);
  
  const asyncIterable = fluentArray.toAsyncIterable();
  for await (const value of asyncIterable) {
    print(value);
  }
})();
