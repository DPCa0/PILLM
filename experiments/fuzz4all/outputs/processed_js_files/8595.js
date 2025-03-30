 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: 'Jane Doe',
          preferences: {
            theme: 'dark',
            language: 'en-US'
          }
        },
        tasks: ['task1', 'task2', 'task3']
      });
    }, 1000);
  });
};

(async () => {
  try {
    const { user, tasks } = await fetchData();

    const { name, preferences: { theme, language } } = user;

    print(`Name: ${name}`);
    print(`Theme: ${theme}`);
    print(`Language: ${language}`);

    const [firstTask, ...remainingTasks] = tasks;
    print(`First Task: ${firstTask}`);
    print(`Remaining Tasks: ${remainingTasks.join(', ')}`);

    const updatePreferences = ({ theme, language, ...otherPrefs }) => {
      return {
        theme: theme || 'light',
        language: language || 'en',
        ...otherPrefs
      };
    };

    const newPreferences = updatePreferences({ language: 'fr', customSetting: true });
    print('Updated Preferences:', newPreferences);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
