 

class DataFetcher {
  constructor(apiUrls) {
    this.apiUrls = apiUrls;
  }

  async fetchData() {
    try {
      const responses = await Promise.all(this.apiUrls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(res => res.json()));
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

const processResults = (...results) => {
  return results.flatMap(({ items }) => items).map(({ name }) => name);
};

(async () => {
  const urls = [
    'https://api.github.com/users/octocat/repos',
    'https://api.github.com/users/defunkt/repos',
  ];
  const dataFetcher = new DataFetcher(urls);

  const [repoData1, repoData2] = await dataFetcher.fetchData();
  const processedData = processResults(repoData1, repoData2);

  const logFormatted = names => print(`Fetched Repositories:\n- ${names.join('\n- ')}`);
  logFormatted(processedData);
})();
