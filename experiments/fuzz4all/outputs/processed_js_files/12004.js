(async () => {
   
  const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const createUser = (name, email) => ({ name, email });

   
  const processUsers = (users) => {
    return users
      .filter(({ isActive }) => isActive)
      .map(({ name, email }) => createUser(name, email))
      .reduce((acc, user) => {
        acc[user.email] = user.name;
        return acc;
      }, {});
  };

   
  try {
    const [users, todos] = await Promise.all([
      fetchJson('https://jsonplaceholder.typicode.com/users'),
      fetchJson('https://jsonplaceholder.typicode.com/todos'),
    ]);

    const activeUsers = processUsers(users);

     
    const userTodosMap = new Map();
    todos.forEach(({ userId, title, completed }) => {
      if (!userTodosMap.has(userId)) userTodosMap.set(userId, []);
      userTodosMap.get(userId).push({ title, completed });
    });

    const incompleteTodosCount = Array.from(userTodosMap.entries()).reduce(
      (acc, [userId, userTodos]) => {
        if (activeUsers[userId]) {
          const incompleteCount = userTodos.filter(({ completed }) => !completed).length;
          acc[userId] = incompleteCount;
        }
        return acc;
      },
      {}
    );

    print('Active Users:', activeUsers);
    print('Incomplete Todos Count for Active Users:', incompleteTodosCount);

  } catch (error) {
    console.error('Error:', error);
  }
})();
