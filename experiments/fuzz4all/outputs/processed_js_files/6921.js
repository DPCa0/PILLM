 
(async () => {
  const { default: fetch } = await import('node-fetch');

   
  async function getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }

   
  const target = {
    message1: "Hello",
    message2: "World"
  };

  const handler = {
    get: function(obj, prop) {
      return prop in obj ? obj[prop] : 'Property does not exist';
    },
    set: function(obj, prop, value) {
      if (typeof value === 'string') {
        obj[prop] = value.toUpperCase();
      }
    }
  };

  const proxy = new Proxy(target, handler);

  print(proxy.message1);  
  print(proxy.message3);  
  proxy.message1 = 'goodbye';
  print(proxy.message1);  

   
  function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
  }

  const sequence = generateSequence();
  print(sequence.next().value);  
  print(sequence.next().value);  
  print(sequence.next().value);  

   
  const dataUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  const postData = await getData(dataUrl);
  print(postData);
})();
