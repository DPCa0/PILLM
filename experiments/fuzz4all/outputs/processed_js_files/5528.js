class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const dataUrls = [
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/comments',
  'https://jsonplaceholder.typicode.com/albums',
];

const parallelFetch = async (urls) => {
  const deferred = new Deferred();
  const results = [];
  const fetchPromises = urls.map((url, index) =>
    fetchData(url)
      .then((data) => {
        results[index] = data;
        if (results.length === urls.length && !results.includes(undefined)) {
          deferred.resolve(results);
        }
      })
      .catch(deferred.reject)
  );

  return deferred.promise;
};

const init = async () => {
  try {
    const allData = await parallelFetch(dataUrls);
    const [posts, comments, albums] = allData;
    print('Posts:', posts.slice(0, 1));
    print('Comments:', comments.slice(0, 1));
    print('Albums:', albums.slice(0, 1));
  } catch (error) {
    console.error('Error during data fetching:', error);
  }
};

init();
