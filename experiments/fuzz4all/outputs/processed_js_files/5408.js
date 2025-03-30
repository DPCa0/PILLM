 

 
async function complexOperation() {
   
  const fetchData = async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { value: Math.random() }, status: 200 });
      }, 1000);
    });
  };

   
  const urls = ['url1', 'url2', 'url3'];
  const results = await Promise.all(urls.map(url => fetchData(url)));

   
  const [{ data: { value: value1 } }, { data: { value: value2 } }, { data: { value: value3 } }] = results;

   
  const valueMap = new Map([
    ['val1', value1],
    ['val2', value2],
    ['val3', value3]
  ]);

  const uniqueValuesSet = new Set([...valueMap.values()]);

   
  const output = {
    message: `Unique values are: ${[...uniqueValuesSet].join(', ')}`,
    valueMap,
    status: 'Complete'
  };

  print(output);
}

 
(async () => {
  await complexOperation();
})();
