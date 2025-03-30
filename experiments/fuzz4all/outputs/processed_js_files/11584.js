 

class Api {
  constructor(data) {
    this.data = data;
  }

  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data);
      }, 1000);
    });
  }
}

 
const handler = {
  get: function (target, propKey, receiver) {
    print(`Method ${propKey} is called`);
    return Reflect.get(...arguments);
  },
};

const dataApi = new Api(['JavaScript', 'Python', 'C++']);
const proxiedApi = new Proxy(dataApi, handler);

async function loadData() {
  try {
    print('Fetching data...');
    const data = await proxiedApi.fetchData();
    print('Data fetched:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

loadData();
