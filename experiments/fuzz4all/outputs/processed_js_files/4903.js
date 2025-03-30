 
(async () => {
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Data fetching failed');
    }
  };

   
  const multiplier = (factor) => (number) => number * factor;

   
  const processData = ({ data: { id, title, userId } }) => {
    const doubledId = multiplier(2)(id);
    print(`Post ID: ${doubledId}, Title: ${title}, User ID: ${userId}`);
  };

   
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
  ];

  const results = await Promise.allSettled(urls.map(url => fetchData(url)));

   
  results
    .map((result) => (result.status === 'fulfilled' ? processData(result.value) : console.warn('Error in result')))
    .flat();

   
  const user = { name: 'John Doe', age: 30 };

  const userProxy = new Proxy(user, {
    set(target, property, value) {
      print(`Property ${property} set to ${value}`);
      target[property] = value;
      return true;
    },
  });

  userProxy.name = 'Jane Doe';  

   
  const formatMessage = (strings, ...values) => {
    return strings.reduce((acc, str, i) => `${acc}${str}<b>${values[i] || ''}</b>`, '');
  };

  const message = formatMessage`Hello, ${userProxy.name}. You are ${userProxy.age} years old.`;
  print(message);

   
  class Utility {
    static _internalCounter = 0;  