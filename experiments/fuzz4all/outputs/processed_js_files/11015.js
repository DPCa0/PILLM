 

const fetchData = url => new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = { message: 'Hello from ' + url };
    Math.random() > 0.1 ? resolve(data) : reject('Fetch error');
  }, 1000);
});

async function* dataGenerator(urls) {
  for (const url of urls) {
    try {
      const data = await fetchData(url);
      yield data;
    } catch (error) {
      console.error(error);
    }
  }
}

function observe(obj, callback) {
  return new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;
      callback(prop, value);
      return true;
    }
  });
}

(async () => {
  const urls = ['site1.com', 'site2.com', 'site3.com'];
  const gen = dataGenerator(urls);
  const results = observe([], (prop, value) => print(`Property ${prop} set to`, value));

  for await (const data of gen) {
    results.push(data);
  }

  print('Final results:', results);
})();
