const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
};

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  *[Symbol.iterator]() {
    for (const item of this.data) {
      yield item;
    }
  }

  transform(transformFn) {
    this.data = this.data.map(transformFn);
    return this;
  }

  async saveData(filename) {
    const json = JSON.stringify(this.data, null, 2);
    await Deno.writeTextFile(filename, json);  
    print(`Data saved to ${filename}`);
  }
}

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const rawData = await fetchData(url);

    const processor = new DataProcessor(rawData)
      .transform(({ id, title }) => ({ postId: id, postTitle: title }));

    for (const item of processor) {
      print(item);
    }

    await processor.saveData('output.json');
  } catch (error) {
    console.error('Error:', error);
  }
})();
