 
const getRandomTimePromise = (name) => new Promise((resolve) => {
    const time = Math.floor(Math.random() * 3000) + 1000;  
    setTimeout(() => resolve(`Finished ${name} in ${time}ms`), time);
});

 
async function runTasksInParallel() {
    const taskNames = ['Task 1', 'Task 2', 'Task 3'];
    
    try {
         
        const tasks = taskNames.map(name => getRandomTimePromise(name));
        
         
        const results = await Promise.all(tasks);
        
         
        for (const result of results) {
            print(result);
        }
        
        print('All tasks completed!');
    } catch (error) {
        console.error('Error in running tasks:', error);
    }
}

 
(async () => {
    print('Starting tasks...');
    await runTasksInParallel();
})();
