 

async function* fetchUrls(urls) {
  for (let url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${url}`);
      yield await response.json();
    } catch (err) {
      yield { error: err.message };
    }
  }
}

function createDataProxy(data) {
  return new Proxy(data, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        console.warn(`Property ${prop} does not exist on target`);
        return undefined;
      }
    },
    set(target, prop, value) {
      if (typeof value === 'string') {
        target[prop] = value.trim();
      } else {
        target[prop] = value;
      }
      print(`Set ${prop} to ${value}`);
      return true;
    },
  });
}

(async function () {
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/users/1'];
  const dataProxy = createDataProxy({});

  for await (let data of fetchUrls(urls)) {
    if (!data.error) {
      for (let [key, value] of Object.entries(data)) {
        dataProxy[key] = typeof value === 'string' ? value : JSON.stringify(value);
      }
      print('Fetched data:', dataProxy);
    } else {
      console.error('Error:', data.error);
    }
  }
})();
