class AsyncDataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  fetchData = async () => {
    try {
      const fetchPromises = this.urls.map(url => fetch(url).then(response => response.json()));
      const results = await Promise.allSettled(fetchPromises);
      const successfulResults = results.filter(result => result.status === 'fulfilled').map(result => result.value);
      print('Fetched Data:', successfulResults);
      return successfulResults;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch data');
    }
  };
}

const processData = (data) => {
  return data.map(item => ({
    ...item,
    processedDate: new Date().toISOString(),
  }));
};

(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const fetcher = new AsyncDataFetcher(urls);
  const data = await fetcher.fetchData();
  const processedData = processData(data);
  
  print('Processed Data:', processedData);
})();

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

window.addEventListener('resize', debounce(() => {
  print('Resized at', new Date().toISOString());
}, 200));
