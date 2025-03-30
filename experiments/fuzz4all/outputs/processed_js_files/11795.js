class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return response.json();
}

function* generateFibonacci(limit) {
  let [a, b] = [0, 1];
  while (a <= limit) {
    yield a;
    [a, b] = [b, a + b];
  }
}

(async () => {
  const fibNumbers = [...generateFibonacci(50)];

  const fetchPromises = fibNumbers.map(num => {
    const deferred = new Deferred();
    setTimeout(async () => {
      try {
        const data = await fetchData(`https: 
        deferred.resolve(data);
      } catch (error) {
        deferred.reject(error);
      }
    }, num * 100);
    return deferred.promise;
  });

  const results = await Promise.allSettled(fetchPromises);

  const successfulResults = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);

  print('Successful fetch results:', successfulResults);
})();
