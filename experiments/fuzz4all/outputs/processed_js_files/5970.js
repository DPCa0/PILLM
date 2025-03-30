class NetworkRequest {
  static cache = new Map();

  constructor(url) {
    this.url = url;
  }

  async fetch() {
    if (NetworkRequest.cache.has(this.url)) {
      return `Cache hit: ${NetworkRequest.cache.get(this.url)}`;
    }

    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.text();
      NetworkRequest.cache.set(this.url, data);
      return `Fetched: ${data}`;
    } catch (error) {
      console.error('Fetch error:', error);
      return 'Fetch failed';
    }
  }
}

(async function() {
  const url = 'https://api.github.com';
  const request = new NetworkRequest(url);

   
  const [result1, result2] = await Promise.all([request.fetch(), request.fetch()]);
  print(result1);
  print(result2);

   
  const cacheHandler = {
    get(target, prop) {
      print(`Accessing cache: ${prop}`);
      return target[prop];
    }
  };

  const proxiedCache = new Proxy(NetworkRequest.cache, cacheHandler);
  print(proxiedCache.get(url));

   
  async function* dataStreamer() {
    yield await request.fetch();
    yield 'Stream Complete';
  }

  for await (const message of dataStreamer()) {
    print(message);
  }
})();
