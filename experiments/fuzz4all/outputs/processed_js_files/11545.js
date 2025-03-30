 
async function fetchData(url) {
   
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = {
        users: [
          { id: 1, name: 'Alice', age: 28 },
          { id: 2, name: 'Bob', age: 34 },
          { id: 3, name: 'Carol', age: 22 }
        ]
      };
      resolve({ json: () => mockData });
    }, 1000);
  });

   
  const { users } = response.json();

   
  const result = users
    .map(({ id, name, age }) => ({ id, name: name.toUpperCase(), age }))
    .filter(user => user.age > 25)
    .reduce((acc, user) => {
      acc.names.push(user.name);
      acc.totalAge += user.age;
      return acc;
    }, { names: [], totalAge: 0 });

  return result;
}

 
(async () => {
  const data = await fetchData('https://mockapi.com/users');
  print(data);  
})();
