 
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

(async () => {
   
  const { default: _ } = await import('https://cdn.skypack.dev/lodash@4.17.21');

   
  const handler = {
    get: function (target, prop, receiver) {
      print(`Property "${prop}" accessed.`);
      return Reflect.get(...arguments);
    },
    set: function (target, prop, value) {
      print(`Property "${prop}" set to "${value}".`);
      return Reflect.set(...arguments);
    },
  };

  const data = new Proxy({ items: [] }, handler);

   
  data.items = await fetchData('https://jsonplaceholder.typicode.com/posts');

   
  const processedData = _.chain(data.items)
    .filter((post) => post.userId === 1)
    .map((post) => _.pick(post, ['id', 'title']))
    .value();

  print('Processed Data:', processedData);
})();
