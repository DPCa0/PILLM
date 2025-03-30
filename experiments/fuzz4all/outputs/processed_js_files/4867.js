class AsyncTask {
    constructor(duration) {
        this.duration = duration;
    }

    async execute() {
        return new Promise((resolve) => setTimeout(resolve, this.duration));
    }
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

(async function main() {
    const tasks = [new AsyncTask(1000), new AsyncTask(2000), new AsyncTask(1500)];
    
     
    print("Starting parallel tasks...");
    const parallelStart = Date.now();
    await Promise.all(tasks.map(task => task.execute()));
    print(`All parallel tasks completed in ${Date.now() - parallelStart}ms`);

     
    print("Starting sequential tasks...");
    const sequentialStart = Date.now();
    for (const task of tasks) {
        await task.execute();
    }
    print(`All sequential tasks completed in ${Date.now() - sequentialStart}ms`);

     
    function* fibonacci() {
        let [prev, curr] = [0, 1];
        while (true) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }

    const fib = fibonacci();
    print("First 5 Fibonacci numbers:");
    for (let i = 0; i < 5; i++) {
        print(fib.next().value);
    }

     
    const handler = {
        get: function(target, prop) {
            return prop in target ? target[prop] : `Property ${prop} not found`;
        },
        set: function(target, prop, value) {
            if (typeof value === 'number') {
                target[prop] = value;
            } else {
                print(`Invalid value for ${prop}: ${value}`);
            }
            return true;
        }
    };

    const data = new Proxy({}, handler);
    data.count = 1;
    print(data.count);  
    data.count = 'two';  
    print(data.count);  
    print(data.missingProperty);  

     
    print("Delaying for 3 seconds...");
    await delay(3000);
    print("Delay complete.");

})();
