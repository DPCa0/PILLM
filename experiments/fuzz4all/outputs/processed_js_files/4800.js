 
const complexFunction = (arr = [], multiplier = 1) => {
   
  return arr.map(({ value }) => value * multiplier)
            .filter((num) => num % 2 === 0)
            .reduce((sum, ...[num]) => sum + num, 0);
};

 
async function* asyncGen() {
  const data = await Promise.resolve([
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
  ]);

  yield* data;
}

 
(async () => {
  const gen = asyncGen();
  const uniqueValues = new Set();

  for await (const item of gen) {
    uniqueValues.add(item);
  }

  print(complexFunction([...uniqueValues], 2));  
})();
