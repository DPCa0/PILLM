 

 
const asyncTask = (msg, duration) => {
    return new Promise(resolve => {
        setTimeout(() => {
            print(msg);
            resolve();
        }, duration);
    });
};

 
async function* taskGenerator() {
    yield asyncTask('Task 1: Loading user data...', 1000);
    yield asyncTask('Task 2: Fetching API results...', 1500);
    yield asyncTask('Task 3: Processing data...', 1000);
}

 
async function executeTasks() {
    const taskGen = taskGenerator();
    for await (const task of taskGen) {
         
        const { length } = { length: 0, ...task }; 
        print(`Task length: ${length}`);
    }

     
    const [res1 = 'Result 1', res2 = 'Result 2'] = await Promise.all([
        Promise.resolve('Data 1'),
        Promise.resolve('Data 2')
    ]);

    print(`Final Results: ${res1}, ${res2}`);
}

 
(async () => {
    await executeTasks();
    print('All tasks completed!');
})();
