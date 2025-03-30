 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processUsers = async (url) => {
  try {
    const users = await fetchData(url);
    return users.map(({ id, name, email, ...rest }) => ({
      id,
      name: name.toUpperCase(),
      email,
      additionalInfo: rest
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const mergeData = async () => {
  const [users, products] = await Promise.all([
    processUsers('https://jsonplaceholder.typicode.com/users'),
    fetchData('https://jsonplaceholder.typicode.com/posts')
  ]);

  return users.map(user => ({
    ...user,
    userProducts: products.filter(product => product.userId === user.id)
  }));
};

mergeData().then(data => print(JSON.stringify(data, null, 2)));
