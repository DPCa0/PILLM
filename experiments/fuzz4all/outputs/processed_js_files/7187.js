 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        users: [
          { id: 1, name: 'Alice', interests: ['reading', 'sports'] },
          { id: 2, name: 'Bob', interests: ['coding', 'gaming'] },
          { id: 3, name: 'Charlie', interests: ['music', 'travel'] },
        ],
      };
      resolve(data);
    }, 1000);
  });
};

const processData = async () => {
  try {
    const { users } = await fetchData('https://example.com/api/data');

     
    const userMap = new Map(users.map(user => [user.id, user]));

     
    const allInterests = new Set(users.flatMap(user => user.interests));

     
    for (const [id, { name, interests }] of userMap) {
      print(`User ID: ${id}, Name: ${name}, Interests: ${interests.join(', ')}`);
    }

    print(`Unique Interests: ${[...allInterests].join(', ')}`);

  } catch (error) {
    console.error('Error processing data:', error);
  }
};

processData();
