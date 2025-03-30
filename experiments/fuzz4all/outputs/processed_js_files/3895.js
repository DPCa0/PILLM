 

class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchData() {
    try {
      const promises = this.urls.map(url => fetch(url).then(res => res.json()));
      const results = await Promise.all(promises);

      return results.map(({ title, body }) => ({ title, body }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

const processAndDisplayData = async (urls) => {
  const fetcher = new DataFetcher(urls);

   
  const data = await fetcher.fetchData();

   
  data.forEach(({ title, ...rest }) => {
    print(`Title: ${title}`);
    print("Details:", rest);
  });
};

 
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2"
];

 
processAndDisplayData(urls);
