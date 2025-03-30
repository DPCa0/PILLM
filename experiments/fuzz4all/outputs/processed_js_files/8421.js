 

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 22 },
        { id: 3, name: 'Charlie', age: 25 },
        { id: 4, name: 'David', age: 35 }
      ];
      if (url === 'https://api.example.com/users') {
        resolve(data);
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

(async () => {
  try {
    const url = 'https://api.example.com/users';
    const users = await fetchData(url);

     
    const olderUsers = users.filter(({ age }) => age > 25);

     
    const userNames = olderUsers.map(({ name, age }) => `${name} (${age} years old)`);

     
    console.table(userNames);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();
