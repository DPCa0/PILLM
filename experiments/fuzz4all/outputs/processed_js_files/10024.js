 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

const processData = async (url) => {
  const fetcher = new DataFetcher(url);
  const data = await fetcher.fetchData();

  if (data) {
    const {
      results: [{ name, email, address: { city }, company: { name: companyName } }],
    } = data;

    print(`Name: ${name}`);
    print(`Email: ${email}`);
    print(`City: ${city}`);
    print(`Company: ${companyName}`);
  } else {
    print('No data to process.');
  }
};

const executeWithDelay = (fn, delay) => new Promise((resolve) => setTimeout(() => resolve(fn()), delay));

(async () => {
  await executeWithDelay(() => processData('https://jsonplaceholder.typicode.com/users'), 2000);
})();
