 

 
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

 
async function readConfigFile() {
  try {
    const data = await fs.promises.readFile('./config.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading config file:', err);
  }
}

 
const configProxyHandler = {
  get(target, prop) {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
function fetchUserData({ apiKey, userId }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!apiKey || !userId) {
        reject(new Error('Invalid API Key or User ID'));
      } else {
        resolve({ userId, name: 'John Doe', role: 'admin' });
      }
    }, 1000);
  });
}

 
(async () => {
  const config = await readConfigFile();

  if (config) {
    const proxyConfig = new Proxy(config, configProxyHandler);

    try {
      const userData = await fetchUserData(proxyConfig);
      print('Fetched User Data:', userData);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }

     
    function* configIterator(obj) {
      for (let key in obj) {
        yield [key, obj[key]];
      }
    }

     
    const iterator = configIterator(proxyConfig);
    for (let [key, value] of iterator) {
      print(`Config Property: ${key} = ${value}`);
    }
  }
})();
