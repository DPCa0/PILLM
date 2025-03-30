 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
};

 
function* dataProcessor(data) {
  for (const item of data) {
    yield `${item.toUpperCase()} processed`;
  }
}

 
(async () => {
  try {
    const data = await fetchData();
    const processor = dataProcessor(data);

     
    const results = [...processor];
    print(results);

     
    const maybeData = null;
    print(maybeData?.items ?? 'No data found');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
