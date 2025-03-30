class AsyncDataHandler {
  constructor() {
    this.dataQueue = [];
  }

  async *fetchData(urls) {
    for (const url of urls) {
      const response = await fetch(url);
      const data = await response.json();
      yield data;
    }
  }

  async processData(urls) {
    for await (const data of this.fetchData(urls)) {
      this.dataQueue.push(data);
      if (this.dataQueue.length > 5) {
        this.dataQueue.shift();  
      }
    }
  }

  logLatestData() {
    print(this.dataQueue.at(-1));
  }
}

 
const getNestedProperty = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc?.[part] ?? 'Not Found', obj);
};

(async function main() {
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  const handler = new AsyncDataHandler();
  
  await handler.processData(urls);
  handler.logLatestData();

  const obj = { user: { profile: { name: 'John Doe' } } };
  print(getNestedProperty(obj, 'user.profile.name'));
  print(getNestedProperty(obj, 'user.details.age'));
})();
