 
(async function() {
   
  function fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 1,
            name: 'Alice',
            preferences: {
              theme: 'dark',
              language: 'en'
            }
          },
          todos: [
            { id: 1, task: 'Learn JavaScript', completed: false },
            { id: 2, task: 'Build a project', completed: false }
          ]
        });
      }, 1000);
    });
  }

  try {
     
    const { user, todos } = await fetchData();
    const { name, preferences: { theme, language } } = user;

     
    print(`User: ${name} prefers ${theme} theme and speaks ${language}.`);
    
     
    const completedTasks = todos.map(({ id, task, completed }) => {
      return `Task ID: ${id} - ${task} [${completed ? 'Completed' : 'Pending'}]`;
    });

    print('Todo List:');
    print(completedTasks.join('\n'));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
