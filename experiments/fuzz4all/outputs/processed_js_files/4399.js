 

class API {
  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }
}

class DataHandler {
  constructor(data) {
    this.data = data;
  }

  displayData() {
    print('Data:', this.data);
  }

  get filteredData() {
    return this.data.filter(item => item.active);
  }
}

const handler = {
  get(target, prop) {
    if (prop === 'activeDataCount') {
      return target.filteredData.length;
    }
    return target[prop];
  }
};

async function main() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const apiData = await API.fetchData(url);

    const dataHandler = new DataHandler(apiData);
    const proxyHandler = new Proxy(dataHandler, handler);

    proxyHandler.displayData();
    print('Active Data Count:', proxyHandler.activeDataCount);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

main();
