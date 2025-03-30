 
(async () => {
     
    const taskResults = new Map();

     
    const tasks = [
        (async () => {
            await new Promise(r => setTimeout(r, 1000));
            const data = "Task 1 Complete";
            taskResults.set('task1', data);
            return data;
        })(),
        (async () => {
            await new Promise(r => setTimeout(r, 500));
            const data = "Task 2 Complete";
            taskResults.set('task2', data);
            return data;
        })(),
        (async () => {
            await new Promise(r => setTimeout(r, 1500));
            const data = "Task 3 Complete";
            taskResults.set('task3', data);
            return data;
        })()
    ];

     
    const results = await Promise.allSettled(tasks);

     
    results.forEach(({ status, value }, i) => {
        if (status === 'fulfilled') {
            print(`Result of Task ${i + 1}:`, value);
        } else {
            console.error(`Task ${i + 1} failed.`);
        }
    });

     
    print("All Task Results from Map:");
    taskResults.forEach((value, key) => print(`${key}: ${value}`));

     
    const output = taskResults.get('task4') ?? 'No result for Task 4';
    print(output);
})();
