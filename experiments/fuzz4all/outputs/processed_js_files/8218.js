 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

 
const loggingProxy = (target) => {
  return new Proxy(target, {
    get(obj, prop) {
      print(`Property '${prop}' accessed`);
      return Reflect.get(obj, prop);
    }
  });
};

 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const processFibonacciData = async (limit) => {
  const fibNumbers = Array.from(fibonacci(limit));
  const proxyFib = loggingProxy({ numbers: fibNumbers });

   
  const promises = proxyFib.numbers.map((num) => fetchData(`https: 
  try {
    const results = await Promise.all(promises);
    print('Fetched data:', results);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
processFibonacciData(21);
