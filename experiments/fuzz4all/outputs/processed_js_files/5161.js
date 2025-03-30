class API {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async fetchData() {
    const response = await fetch(this.endpoint);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }
}

function logResult(result) {
  print(result);
}

(async () => {
  try {
    const api = new API('https://jsonplaceholder.typicode.com/todos/1');
    const data = await api.fetchData();
    logResult(data);

    const enhancedData = new Proxy(data, {
      get(target, prop) {
        if (prop === 'summary') {
          return `Todo #${target.id}: ${target.title} (${target.completed ? 'completed' : 'pending'})`;
        }
        return Reflect.get(target, prop);
      }
    });

    print(enhancedData.summary);

  } catch (error) {
    console.error('Error:', error);
  }
})();
