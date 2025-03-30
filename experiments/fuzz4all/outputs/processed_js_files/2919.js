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
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  return await response.json();
}

function* generateDataSequence(start, limit) {
  let current = start;
  while (current < limit) {
    yield current++;
  }
}

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const deferred = new Deferred();

    const fetchTimeout = setTimeout(() => {
      deferred.reject(new Error('Fetch timeout'));
    }, 5000);

    fetchData(url)
      .then(data => {
        clearTimeout(fetchTimeout);
        deferred.resolve(data);
      })
      .catch(deferred.reject);

    const data = await deferred.promise;
    print('Fetched Data:', data.slice(0, 3));

    const sequence = generateDataSequence(1, 5);
    for (const num of sequence) {
      print(`Generated Number: ${num}`);
    }
    
    const doubledData = await Promise.all(data.slice(0, 3).map(async post => {
      return { ...post, title: post.title.toUpperCase() };
    }));

    print('Transformed Data:', doubledData);

  } catch (error) {
    console.error('Error:', error.message);
  }
})();
