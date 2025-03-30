 
async function* asyncFibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
     
    await new Promise((resolve) => setTimeout(resolve, 100));
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
async function loadLodashAndPrint() {
  const _ = await import('https://cdn.skypack.dev/lodash-es');

  const data = { name: 'Alice', age: 30, occupation: 'Developer' };
  const capitalizedKeysData = _.mapKeys(data, (v, k) => _.capitalize(k));

  print('Capitalized keys:', capitalizedKeysData);
}

 
(async () => {
  print('Fibonacci sequence:');
  for await (const num of asyncFibonacci(10)) {
    print(num);
  }

  print('Loading lodash and transforming data:');
  await loadLodashAndPrint();
})();
