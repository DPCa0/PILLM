class Fibonacci {
  *generate(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

(async function execute() {
  const fib = new Fibonacci();
  const iterator = fib.generate(10);

  print('First 10 Fibonacci numbers:');
  for (let num of iterator) {
    print(num);
  }

  print('\nFetching data from an API:');
  const apiUrl = 'https://api.github.com/users/octocat';
  await fetchData(apiUrl);

  print('\nRunning a task after a delay using a Promise:');
  const delayedTask = new Promise((resolve) => setTimeout(resolve, 2000));
  delayedTask.then(() => print('Task completed after 2 seconds'));
})();
