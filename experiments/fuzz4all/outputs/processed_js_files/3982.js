(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const processUsers = (users) => {
    return users.map(({ id, name, email }) => 
      `ID: ${id}, Name: ${name}, Email: ${email.toLowerCase()}`
    ).join('\n');
  };

   
  try {
    const urls = [
      'https://jsonplaceholder.typicode.com/users',
      'https://jsonplaceholder.typicode.com/posts'
    ];
    const [users, posts] = await Promise.all(urls.map(fetchData));

     
    const uniqueUserIds = [...new Set(posts.map(post => post?.userId))];

     
    const filteredUsers = users.filter(user => uniqueUserIds.includes(user.id));

     
    print(processUsers(filteredUsers));
  } catch (error) {
    console.error('Error:', error.message);
  }

   
  const userHandler = {
    set: (obj, prop, value) => {
      if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
        throw new Error('Invalid age value');
      }
      obj[prop] = value;
      return true;
    }
  };

  const user = new Proxy({}, userHandler);
  try {
    user.name = 'Alice';
    user.age = 30;
    print(user);
     
     
  } catch (error) {
    console.error('Proxy Error:', error.message);
  }
})();
