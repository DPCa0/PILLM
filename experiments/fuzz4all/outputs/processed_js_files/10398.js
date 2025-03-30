const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class DataProcessor {
  #data = [];

  constructor(data) {
    this.#data = data;
  }

  filterBy(criteria) {
    return new DataProcessor(this.#data.filter(criteria));
  }

  transform(transformation) {
    return new DataProcessor(this.#data.map(transformation));
  }

  toSortedArray(sortFn) {
    return [...this.#data].sort(sortFn);
  }

  [Symbol.iterator]() {
    let index = -1;
    const data = this.#data;
    return {
      next: () => ({
        value: data[++index],
        done: index >= data.length,
      }),
    };
  }
}

(async () => {
  try {
    const rawData = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const processor = new DataProcessor(rawData);

    const results = processor
      .filterBy(post => post.userId === 1)
      .transform(post => ({ title: post.title.toUpperCase(), body: post.body }))
      .toSortedArray((a, b) => a.title.localeCompare(b.title));

    for (const result of results) {
      print(result);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
