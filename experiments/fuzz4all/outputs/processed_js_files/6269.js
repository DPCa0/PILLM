 
class ComplexDataStructure {
  constructor() {
    this.data = new Map();
  }

  add(key, value) {
    if (!this.data.has(key)) {
      this.data.set(key, []);
    }
    this.data.get(key).push(value);
  }

  *[Symbol.iterator]() {
    for (const [key, values] of this.data.entries()) {
      for (const value of values) {
        yield { key, value };
      }
    }
  }

  getValues() {
    return Array.from(this).map(({ value }) => value);
  }
}

 
async function fetchDataSimulator(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data for ID: ${id}`);
    }, Math.random() * 1000);
  });
}

(async () => {
  const structure = new ComplexDataStructure();

   
  const promises = [1, 2, 3, 4, 5].map(async (id) => {
    const data = await fetchDataSimulator(id);
    structure.add('group1', data);
  });

  await Promise.all(promises);

   
  const [first, ...rest] = structure.getValues();
  print(`First value: ${first}`);
  print(`Rest of values: ${rest.join(', ')}`);

   
  for (const { key, value } of structure) {
    print(`Key: ${key}, Value: ${value}`);
  }
})();
