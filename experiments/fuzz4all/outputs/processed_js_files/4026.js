 
(async () => {
  if (!globalThis.document) {
    globalThis.document = { body: {}, createElement: () => ({}) };
  }

  const moduleSpecifier = 'https://cdn.jsdelivr.net/npm/luxon@3/build/es6/luxon.min.js';
  
  const map = document.createElement('script');
  map.type = 'importmap';
  map.textContent = JSON.stringify({
    imports: {
      'luxon': moduleSpecifier
    }
  });
  document.body.appendChild(map);
  
  const { DateTime } = await import('luxon');

   
  const handler = {
    get: (target, prop, receiver) => {
      if (prop === 'currentDate') {
        return DateTime.now().toISO();
      }
      return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(target, prop, value, receiver);
    }
  };

  const data = {
    name: "Advanced JavaScript",
    info: "Playing with Proxies and Reflect"
  };

  const proxyData = new Proxy(data, handler);

   
  const tag = (strings, ...values) => {
    return strings.reduce((acc, str, index) => {
      return `${acc}${str}${values[index] ? values[index] : ''}`;
    }, '');
  };

  const message = tag`The ${proxyData.name} session is scheduled for ${proxyData.currentDate}. ${proxyData.info}`;
  
  print(message);

   
  const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

  const results = await Promise.all(urls.map(url => fetchData(url)));

  results.forEach((result, index) => {
    print(`Post ${index + 1}:`, result);
  });

   
  proxyData.name = "Complex JavaScript Example";
  console.log('