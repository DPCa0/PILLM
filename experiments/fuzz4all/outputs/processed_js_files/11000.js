class Fibonacci {
  constructor(limit) {
    this.limit = limit;
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield prev;
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

(async () => {
  try {
    const fibSequence = new Fibonacci(10);
    print([...fibSequence]);  
    
    const url = 'https://api.example.com/data';  
    const data = await fetchData(url);
    
    const processedData = data.map(item => ({
      ...item,
      timestamp: new Date(item.timestamp).toLocaleString()
    }));

    print(processedData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
