class Fibonacci {
  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

const fibonacci = new Fibonacci();
const fibIter = fibonacci[Symbol.iterator]();

const getData = async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    print('Data fetched:', data);

    const fibNumbers = Array.from({length: 10}, () => fibIter.next().value);
    print('First 10 Fibonacci numbers:', fibNumbers);
    
    const doubledFibs = fibNumbers.map(num => num * 2);
    print('Doubled Fibonacci numbers:', doubledFibs);

    const total = doubledFibs.reduce((acc, num) => acc + num, 0);
    print('Total of doubled Fibonacci numbers:', total);

  } catch (error) {
    console.error('Fetching error:', error);
  }
};

getData();
