 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

 
const processData = (items) => {
  const [firstItem, ...restItems] = items;
  const details = restItems.map(({ id, name }) => ({ id, name }));
  return `First Item: ${JSON.stringify(firstItem)}, Rest Details: ${JSON.stringify(details)}`;
};

 
const runApp = async () => {
  try {
    const apiEndpoint = 'https://jsonplaceholder.typicode.com/users';
    const users = await fetchData(apiEndpoint);

     
    const user = users?.[0] ?? { name: 'Default User' };

    print(`Selected User: ${user.name}`);

     
    const highlight = (strings, ...values) => strings.reduce((acc, str, idx) => `${acc}${str}<strong>${values[idx] || ''}</strong>`, '');

    print(highlight`User Data: ${JSON.stringify(users)}`);

     
    const extendedUsers = [...users, { id: 11, name: 'New User', ...user }];

    print(processData(extendedUsers));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

runApp();
