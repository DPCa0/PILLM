const asyncOperation = () => new Promise((resolve) => setTimeout(() => resolve('Data Loaded'), 2000));

async function* dataLoader() {
  while (true) {
    yield await asyncOperation();
  }
}

(async () => {
  const dataGen = dataLoader();
  const [first, second, third] = await Promise.all([dataGen.next(), dataGen.next(), dataGen.next()]);
  
  const processData = ({ value }) => `Processed: ${value.toUpperCase()}`;
  const processedData = [first, second, third].map(processData);

  print(processedData.join(' | '));

  const complexStructure = new Proxy(
    { data: 'Secure Info', getData() { return this.data; } },
    {
      get(target, property) {
        if (property === 'data') {
          return 'Access Denied';
        }
        return Reflect.get(target, property);
      }
    }
  );

  print(complexStructure.getData());
  print(complexStructure.data);
})();
