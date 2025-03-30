 
(async () => {
  if (typeof fetch === 'undefined') {
    var { default: fetch } = await import('node-fetch');
  }

   
  const validator = {
    set(target, key, value) {
      if (key === 'age' && typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      target[key] = value;
      return true;
    },
  };

  const person = new Proxy({}, validator);
  person.name = 'Alice';
  person.age = 30;  

   
  const uniqueCities = new Set(['New York', 'Los Angeles', 'New York']);
  uniqueCities.add('Chicago');

  const cityRatings = new Map();
  cityRatings.set('New York', 5);
  cityRatings.set('Los Angeles', 4);
  cityRatings.set('Chicago', 3);

   
  async function fetchData(urls) {
    const promises = urls.map(url => fetch(url).then(response => response.json()));
    return Promise.all(promises);
  }

   
  function mergeObjects(...objects) {
    return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
  }

   
  try {
    const urls = [
      'https://api.github.com/users/octocat',
      'https://api.github.com/users/defunkt',
    ];
    
    const [user1, user2] = await fetchData(urls);

    print('User 1:', user1);
    print('User 2:', user2);

    print('Merged Object:', mergeObjects(user1, user2));
    print('Unique Cities:', [...uniqueCities]);
    print('City Ratings:', [...cityRatings.entries()]);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
