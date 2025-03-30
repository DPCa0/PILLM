class MathSet {
  #elements;

  constructor(initialElements = []) {
    this.#elements = new Set(initialElements);
  }

  add(element) {
    this.#elements.add(element);
    return this;  
  }

  delete(element) {
    this.#elements.delete(element);
    return this;  
  }

  get size() {
    return this.#elements.size;
  }

  [Symbol.iterator]() {
    return this.#elements.values();
  }

  static union(setA, setB) {
    return new MathSet([...setA, ...setB]);
  }

  async filterAsync(predicate) {
    const results = await Promise.all([...this].map(async el => {
      const result = await predicate(el);
      return result ? el : undefined;
    }));
    return new MathSet(results.filter(el => el !== undefined));
  }
}

(async () => {
  const set1 = new MathSet([1, 2, 3, 4, 5]);
  const set2 = new MathSet([4, 5, 6, 7, 8]);

  const unionSet = MathSet.union(set1, set2);
  
  const filteredSet = await unionSet.filterAsync(async el => {
    await new Promise(resolve => setTimeout(resolve, 50));  
    return el % 2 === 0;
  });

  print([...filteredSet]);  
})();
