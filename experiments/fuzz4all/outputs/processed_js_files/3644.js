 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: 'John Doe',
          tasks: [
            { id: 101, title: 'Do laundry', completed: false },
            { id: 102, title: 'Prepare lunch', completed: false },
            { id: 103, title: 'Read a book', completed: false }
          ]
        }
      });
    }, 1000);
  });
};

 
class UserManager {
  constructor(user) {
    this.user = user;
  }

   
  completeAllTasks() {
    this.user.tasks = this.user.tasks.map(task => ({ ...task, completed: true }));
  }
}

 
(async () => {
  try {
     
    const data = await fetchData();

     
    const { user } = data;

     
    const userManager = new UserManager(user);

     
    print('Initial tasks:', ...user.tasks);

     
    userManager.completeAllTasks();

     
    print('Completed tasks:', ...user.tasks);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
