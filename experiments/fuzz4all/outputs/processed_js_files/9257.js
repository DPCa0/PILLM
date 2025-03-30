 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(target, prop, receiver);
  },
};

const obj = new Proxy({ a: 1, b: 2, c: 3 }, handler);

 
const uniqueDataSet = new Set();

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const users = await fetchData(url);

  if (users) {
    users.forEach(user => {
       
      const { id, name, email } = user;
      
       
      print(`User ID: ${id}, Name: ${name}, Email: ${email}`);

       
      uniqueDataSet.add(name);
    });

    print('Unique names:', [...uniqueDataSet]);
  }

   
  print(obj.a, obj.b, obj.c);
})();
