 
const fetchUserData = async (userId) => {
     
    const userPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: "John Doe", role: "developer", permissions: ['read', 'write'] });
        }, 1000);
    });

     
    const tasksPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { taskId: 1, title: "Fix bug", status: "completed" },
                { taskId: 2, title: "Write tests", status: "pending" }
            ]);
        }, 500);
    });

     
    const [user, tasks] = await Promise.all([userPromise, tasksPromise]);

     
    const userWithTasks = { ...user, tasks };

     
    console.log(`User Details:
    ID: ${userWithTasks.id}
    Name: ${userWithTasks.name}
    Role: ${userWithTasks.role}
    Permissions: ${userWithTasks.permissions.join(', ')}
    Tasks: ${userWithTasks.tasks.map(t => `\n\tTask ID: ${t.taskId}, Title: ${t.title}, Status: ${t.status}`).join('')}
    `);
};

 
fetchUserData(42);
