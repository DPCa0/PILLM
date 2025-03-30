class NetworkRequest {
  #url;
  constructor(url) {
    this.#url = url;
  }
  
  async fetchData() {
    try {
      const response = await fetch(this.#url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return this.#processData(data);
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }

  #processData(data) {
    return data.map(item => ({
      id: item.id,
      name: item.name.toUpperCase(),
      details: {
        ...item.details,
        date: new Date(item.details.date)
      }
    }));
  }
}

const debounce = (fn, delay) => {
  let timeoutID;
  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
};

const logger = debounce((message) => print(`Logged: ${message}`), 1000);

(async () => {
  const api = new NetworkRequest('https://jsonplaceholder.typicode.com/users');
  const users = await api.fetchData();
  if (users) {
    print('Processed Users:', users);
    users.forEach(user => logger(`User: ${user.name}`));
  }
})();
