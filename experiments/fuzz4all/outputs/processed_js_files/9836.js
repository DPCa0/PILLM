class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchJson() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Fetching error:", error);
    }
  }
}

const processData = ({ id, title }) => ({
  identifier: id,
  uppercaseTitle: title.toUpperCase(),
});

const pipeline = async (url) => {
  const fetcher = new DataFetcher(url);
  const data = await fetcher.fetchJson();

  if (!Array.isArray(data)) {
    console.error("Expected an array, but got:", data);
    return;
  }

  const processedData = data
    .filter(item => item.id && item.title)
    .map(processData)
    .reduce((acc, item) => ({ ...acc, [item.identifier]: item.uppercaseTitle }), {});

  print("Processed Data:", processedData);
};

 
(async () => {
  const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";
  await pipeline(apiEndpoint);
})();
