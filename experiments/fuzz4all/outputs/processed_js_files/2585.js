class Fibonacci {
  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

const fib = new Fibonacci();
const firstTen = [...fib].slice(0, 10);  

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const processData = async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
  const transformedData = data
    ?.map(({ userId, id, title }) => ({ userId, id, title }))
    .filter(({ id }) => id <= 10);

  print('First 10 Fibonacci numbers:', firstTen);
  console.table(transformedData);
};

processData();
