 

const fetchData = async (url) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { id: 1, name: 'Alice', age: 30 },
          { id: 2, name: 'Bob', age: 25 },
          { id: 3, name: 'Charlie', age: 35 },
        ],
      });
    }, 1000);
  });
};

const processUsers = async () => {
  try {
    const { data } = await fetchData('https://api.example.com/users');
    
     
    const usersInfo = data.map(({ id, name, age }) => ({
      id,
      description: `User ${name} is ${age} years old.`,
    }));

    print(usersInfo);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

processUsers();
