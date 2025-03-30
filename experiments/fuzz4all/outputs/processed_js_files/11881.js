 
const fetch = require('node-fetch');

(async () => {
   
  const urls = [
    'https://api.github.com/users/octocat',
    'https://api.github.com/users/defunkt',
    'https://nonexistent-url.com/notfound'
  ];

  const requests = urls.map(url => fetch(url).then(res => res.json()));

  const results = await Promise.allSettled(requests);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Fetched ${urls[index]}:`, result.value);
    } else {
      print(`Failed to fetch ${urls[index]}:`, result.reason);
    }
  });

   
  const target = { name: 'Octocat', location: 'San Francisco' };
  const handler = {
    get(obj, prop) {
      print(`Accessing property '${prop}'`);
      return obj[prop];
    },
    set(obj, prop, value) {
      print(`Setting property '${prop}' to '${value}'`);
      obj[prop] = value;
      return true;
    }
  };

  const proxy = new Proxy(target, handler);
  print(proxy.name);
  proxy.location = 'GitHub HQ';
  print(proxy.location);

   
  function* range(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }

  print([...range(1, 5)]);

   
  function htmlEscape(strings, ...values) {
    return strings.reduce((acc, str, i) => 
      acc + str + (values[i] ? String(values[i]).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : ''), '');
  }

  const userInput = '<script>alert("xss")</script>';
  const output = htmlEscape`User input: ${userInput}`;
  print(output);
})();
