 
function* fibonacci(n) {
  let [prev, curr] = [0, 1];
  while (n-- > 0) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
async function fetchData(url) {
  let response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  let data = await response.json();
  return data;
}

 
(async () => {
  try {
    let [apiData, fibonacciSeq] = await Promise.all([
      fetchData('https://api.example.com/data'),
      Promise.resolve([...fibonacci(10)])
    ]);

    print('Fetched Data:', apiData);
    print('Fibonacci Sequence:', fibonacciSeq);

     
    let processedData = apiData.map(item => ({
      ...item,
      value: item.value * 2
    })).filter(item => item.value > 10);

    print('Processed Data:', processedData);

     
    let handler = {
      get(target, prop, receiver) {
        if (prop in target) {
          return target[prop];
        } else {
          console.warn(`Property "${prop}" not found!`);
          return null;
        }
      }
    };

    let dataProxy = new Proxy(processedData, handler);
    print('Proxy Access:', dataProxy.someProperty);  

  } catch (error) {
    console.error('Error:', error);
  }
})();
