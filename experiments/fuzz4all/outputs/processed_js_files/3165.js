class NetworkRequest {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      let response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch data: ${error.message}`);
    }
  }
}

const processData = async (url) => {
  let request = new NetworkRequest(url);
  let data = await request.fetchData();
  if (data) {
    const { values } = data;
    let transformedData = values.map(({ id, amount }) => ({ id, amount: amount * 2 }));
    console.table(transformedData);
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const url = 'https://api.example.com/data';
  print('Fetching data...');
  await processData(url);
  
  const debounced = _.debounce(() => print('Debounced execution'), 300);
  for (let i = 0; i < 5; i++) {
    print(`Invoke debounce #${i + 1}`);
    debounced();
    await delay(100);
  }
})();

Note: This code assumes the presence of an external library like Lodash for the debounce function.