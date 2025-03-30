 

class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchAll() {
    const fetchPromises = this.urls.map(url => fetch(url).then(res => res.json()));
    return await Promise.all(fetchPromises);
  }
}

const manipulateData = ({name, age, ...rest}) => {
  return {fullName: `${name} Smith`, age: age + 1, ...rest};
};

(async () => {
  const urls = [
    'https://api.example.com/user1',
    'https://api.example.com/user2'
  ];

  const dataFetcher = new DataFetcher(urls);
  try {
    const results = await dataFetcher.fetchAll();
    const transformedResults = results.map(data => manipulateData(data));
    print(transformedResults);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
