 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
class ConfigHandler {
  constructor(initialConfig = {}) {
    this.configMap = new Map(Object.entries(initialConfig));
  }

   
  *getConfigEntries() {
    for (const [key, value] of this.configMap.entries()) {
      yield { key, value };
    }
  }

   
  get configProxy() {
    const handler = {
      set: (obj, prop, value) => {
        print(`Setting config: ${prop} = ${value}`);
        obj.configMap.set(prop, value);
        return true;
      },
      get: (obj, prop) => {
        if (!obj.configMap.has(prop)) {
          console.warn(`Config key "${prop}" not found`);
        }
        return obj.configMap.get(prop);
      }
    };
    return new Proxy(this, handler);
  }
}

 
(async () => {
  const configHandler = new ConfigHandler({ theme: 'dark', language: 'en' });
  const proxyConfig = configHandler.configProxy;

   
  const apiData = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  proxyConfig.userId = apiData.userId;
  proxyConfig.title = apiData.title;

   
  for (const entry of configHandler.getConfigEntries()) {
    print(`${entry.key}: ${entry.value}`);
  }
})();
