 
(async () => {
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  const processData = ({ name, age, ...others } = { name: "Anonymous", age: 0 }) => {
    print(`Processing data for ${name}, aged ${age}`);
    print('Additional data:', others);
  };

   
  async function* fetchData(urls) {
    for (const url of urls) {
      try {
        const response = await axios.get(url);
        yield response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        yield null;
      }
    }
  }

   
  const users = [
    { id: 1, profile: { name: 'Alice', age: 30 } },
    { id: 2 },  
    { id: 3, profile: { name: 'Charlie', age: 25 } }
  ];

   
  const fetchUsersData = async () => {
    const urls = [
      'https://jsonplaceholder.typicode.com/users/1',
      'https://jsonplaceholder.typicode.com/users/2',
      'https://jsonplaceholder.typicode.com/users/3'
    ];

    for await (const data of fetchData(urls)) {
      print('Fetched data:', data?.name ?? 'No name available');
    }

    users.forEach(user => {
      const profile = user.profile;
      processData({
        name: profile?.name ?? 'Unnamed',
        age: profile?.age ?? 'Unknown',
        id: user.id ?? 'N/A'
      });
    });
  };

   
  const handler = {
    set(target, property, value) {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const proxyUser = new Proxy({ name: 'ProxyUser', age: 28 }, handler);
  proxyUser.age = 29;  

   
  fetchUsersData();
})();
