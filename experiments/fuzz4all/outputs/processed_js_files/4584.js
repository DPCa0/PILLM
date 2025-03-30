class AsyncStream {
  constructor(data) {
    this.data = data;
  }

  async *[Symbol.asyncIterator]() {
    for (let item of this.data) {
      await new Promise(resolve => setTimeout(resolve, 100));
      yield item;
    }
  }
}

const delayLog = async (item, index) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      print(`Processed item ${index + 1}:`, item);
      resolve();
    }, 200);
  });
};

const fetchData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await response.json();
};

(async () => {
  try {
    const rawData = await fetchData();
    const dataStream = new AsyncStream(rawData);

    await Promise.all([...dataStream].map(delayLog));

    const uniqueWords = new Set(rawData.flatMap(post => post.title.split(' ')));
    print('Unique words in titles:', uniqueWords);

    const wordOccurrences = rawData.reduce((map, post) => {
      post.title.split(' ').forEach(word => {
        map.set(word, (map.get(word) || 0) + 1);
      });
      return map;
    }, new Map());

    print('Word occurrences:', [...wordOccurrences.entries()]);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
