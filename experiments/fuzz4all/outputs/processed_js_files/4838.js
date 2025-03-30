 
(async () => {
  const crypto = await import('crypto');

   
  const generateToken = (length = 48) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(length, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer.toString('hex'));
      });
    });
  };

   
  const user = { name: "Alice", age: 30 };

  const userProxy = new Proxy(user, {
    get(target, property) {
      print(`Accessed property "${property}"`);
      return target[property];
    },
  });

  print(userProxy.name);  
  print(userProxy.age);   

   
  const fetchDataConcurrently = async (urls) => {
    const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
    try {
      const data = await Promise.all(fetchPromises);
      print('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   
  const sampleUrls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];

   
  await fetchDataConcurrently(sampleUrls);

   
  try {
    const token = await generateToken();
    print('Generated secure token:', token);
  } catch (error) {
    console.error('Error generating token:', error);
  }

})();
