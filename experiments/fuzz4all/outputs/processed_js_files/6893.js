class ComplexOperations {
  static #privateMethod(val) {
    return new Promise((resolve) => setTimeout(() => resolve(val * val), 500));
  }

  static async computeResults(arr) {
    const results = await Promise.all(arr.map(async (num) => {
      const squared = await this.#privateMethod(num);
      return { num, squared };
    }));

    return results.reduce((acc, { num, squared }) => {
      acc.set(num, squared);
      return acc;
    }, new Map());
  }
}

(async () => {
  const numbers = [1, 2, 3, 4, 5];
  const results = await ComplexOperations.computeResults(numbers);

  print('Number to Square Map:');
  for (let [num, squared] of results) {
    print(`Number: ${num}, Squared: ${squared}`);
  }

  print('Iterating with Iterator Protocol:');
  const iterator = results[Symbol.iterator]();
  let result;
  while (!(result = iterator.next()).done) {
    print(result.value);
  }
})();
