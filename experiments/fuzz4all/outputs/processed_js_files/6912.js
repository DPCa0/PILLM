 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
     
    const { title, body } = data;
    
     
    print(`Title: ${title}\nBody: ${body}`);
    
     
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data processed successfully!');
      }, 1000);
    });

  } catch (error) {
    console.error('Fetching data failed:', error);
  }
};

 
(async () => {
  const message = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print(message);

   
  const users = new Set(['Alice', 'Bob', 'Charlie']);
  const userMap = new Map([...users].map((user, index) => [index, user]));

  for (const [key, value] of userMap) {
    print(`User ${key}: ${value}`);
  }

   
  const combinedUsers = [...users, 'Dave', 'Eve'];
  print('Combined Users:', combinedUsers);
})();
