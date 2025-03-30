 
async function* fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Failed to fetch data');
      yield await response.json();
      return;
    } catch (error) {
      if (i < retries - 1) {
        print(`Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;  
      } else {
        throw new Error('Failed after retries');
      }
    }
  }
}

 
const stateHandler = {
  get(target, key, receiver) {
    print(`Getting ${key}`);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    print(`Setting ${key} to ${value}`);
    return Reflect.set(target, key, value, receiver);
  }
};

const state = new Proxy({ data: null }, stateHandler);

 
(async () => {
  try {
    const generator = fetchWithRetry('https://api.example.com/data');
    for await (const data of generator) {
      state.data = data;  
      print('Data fetched:', data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
