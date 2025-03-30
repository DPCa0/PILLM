 

 
const fetchData = async () => {
   
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
const processData = (fn) => async (...args) => {
  try {
    const data = await fn(...args);
    print('Processed Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

 
const logPost = ({ userId, id, title, body }) => {
  print(`User ${userId} created a post with ID ${id}:`);
  print(`Title: ${title}`);
  print(`Body: ${body}`);
};

 
(async () => {
   
  const processors = new Set();
  processors.add(processData(fetchData));

  for (let processFn of processors) {
    await processFn(logPost);
  }
})();

 
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const usersMap = new Map(users.map(user => [user.id, user]));
const allUsers = [...usersMap.values()].map(user => ({ ...user, active: true }));
print('All Users:', allUsers);
