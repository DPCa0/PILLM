 

const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: 'Jane Doe',
          friends: [
            { id: 2, name: 'John Smith' },
            { id: 3, name: 'Emily Johnson' },
          ],
        },
        meta: { status: 200 },
      });
    }, 1000);
  });
};

const displayUserData = async () => {
  try {
    const { user: { id, name, friends }, meta: { status } } = await fetchData();

    if (status === 200) {
      print(`User: ${name} (ID: ${id})`);
      print('Friends:');
      friends.forEach(({ id, name }) => {
        print(`- ${name} (ID: ${id})`);
      });
    } else {
      console.error('Failed to fetch user data.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

displayUserData();
