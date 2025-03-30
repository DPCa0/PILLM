class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

 
async function* fetchDataSequentially(urls) {
  for (const url of urls) {
    yield fetch(url).then(res => res.json());
  }
}

const handleResponses = async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  
   
  const [response1, response2] = await Promise.all(
    [...fetchDataSequentially(urls)]
  );

   
  const { key1, key2, ...restData } = response1;
  const mergedData = { ...restData, ...response2 };

   
  print(mergedData.key1?.nestedKey ?? 'Default Value');
};

 
(async () => {
  const deferred = new Deferred();
  setTimeout(() => deferred.resolve('Deferred Resolved!'), 2000);

  print(await deferred.promise);
  await handleResponses();
})();
