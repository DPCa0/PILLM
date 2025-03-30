 
const randomTimeoutPromise = () => {
    return new Promise((resolve) => {
        const timeout = Math.floor(Math.random() * 5000);
        setTimeout(() => resolve(timeout), timeout);
    });
};

 
async function runConcurrentTasks() {
     
    const promises = [randomTimeoutPromise(), randomTimeoutPromise(), randomTimeoutPromise()];

     
    const results = await Promise.allSettled(promises);

     
    const timeouts = results.map(({ status, value }, index) => {
        if (status === 'fulfilled') {
            return `Task ${index + 1} completed in ${value} ms`;
        } else {
            return `Task ${index + 1} failed`;
        }
    });

     
    const uniqueTimeouts = new Set(timeouts);

     
    for (const message of uniqueTimeouts) {
        print(message);
    }
}

 
(async () => {
    print('Starting concurrent tasks...');
    await runConcurrentTasks();
    print('All tasks processed.');
})();
