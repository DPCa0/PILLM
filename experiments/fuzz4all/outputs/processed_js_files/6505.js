 

 
const util = (() => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  };

  return { fetchData };
})();

 
class DataProcessor {
  constructor(url) {
    this.url = url;
    this.data = null;
  }

  async loadData() {
    try {
      this.data = await util.fetchData(this.url);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  processData() {
    if (!this.data) return;

    const { title, body, userId } = this.data;
    print(`Title: ${title}\nBody: ${body}\nUser ID: ${userId}`);
  }
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const processor = new DataProcessor(url);

  await processor.loadData();
  processor.processData();
})();
