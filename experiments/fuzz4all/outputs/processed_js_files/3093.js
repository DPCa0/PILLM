 
const complexProcess = async () => {
  const apiCall = (url) => new Promise((resolve) => setTimeout(() => resolve({ data: { users: [{ name: 'Alice' }, { name: 'Bob' }] } }), 1000));

  const manipulateData = ({ users }) => {
    const [firstUser, ...restUsers] = users;
    return {
      ...firstUser,
      friends: restUsers.map(({ name }) => name),
    };
  };

  try {
    const response = await apiCall('https://fakeapi.com/users');
    const result = manipulateData(response.data);
    print(result);  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

complexProcess();
