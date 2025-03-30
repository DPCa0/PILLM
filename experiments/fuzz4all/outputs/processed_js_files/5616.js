 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
};

 
const createCounter = () => {
  let count = 0;
  return () => ++count;
};

 
const processData = (data) => {
  const map = new Map(data.map(({ id, value }) => [id, value]));
  const uniqueValues = new Set(map.values());
  return [...uniqueValues].map((value) => ({ value }));
};

 
function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const counter = createCounter();
    const results = processData(data.slice(0, 10));
    const fibGen = fibonacciGenerator();

    print(`Counter: ${counter()}`);
    print('Processed Data:', results);
    print('First 5 Fibonacci numbers:');
    print([...Array(5)].map(() => fibGen.next().value));
  } catch (error) {
    console.error('Error:', error);
  }
})();
