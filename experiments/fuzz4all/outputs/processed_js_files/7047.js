 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, data: { users: ['Alice', 'Bob', 'Charlie'] } });
    }, 1000);
  });
};

const processData = async () => {
  try {
    const { status, data: { users } } = await fetchData();
    if (status === 200) {
      const enrichedUsers = users.map((user, index) => ({ id: index + 1, name: user }));
      print(`Fetched Users:\n${enrichedUsers.map(u => `ID: ${u.id}, Name: ${u.name}`).join('\n')}`);
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

 
processData();
