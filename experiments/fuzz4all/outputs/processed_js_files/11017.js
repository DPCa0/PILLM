 
const complexObject = {
  name: "AdvancedObject",
  data: [1, 2, 3, 4, 5],
  compute: function (x) {
     
    const multiplier = 10;
    return this.data.map((num) => num * multiplier + x);
  },
  asyncProcess: async function () {
     
    const fetchData = () => new Promise(resolve => {
      setTimeout(() => resolve("Fetched Data"), 1000);
    });
    const result = await fetchData();
    return result;
  },
  generator: function* () {
     
    let i = 0;
    while (i < this.data.length) {
      yield this.data[i++];
    }
  },
  [Symbol.iterator]: function* () {
     
    yield* this.generator();
  },
};

 
const { compute, ...rest } = complexObject;
const computedData = compute(5);

 
function tagged(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}
print(tagged`Computed Data: ${computedData.join(", ")}`);

 
print("Iterating over complexObject:");
for (const value of complexObject) {
  print(value);
}

 
(async () => {
  const data = await complexObject.asyncProcess();
  print(data);
})();
