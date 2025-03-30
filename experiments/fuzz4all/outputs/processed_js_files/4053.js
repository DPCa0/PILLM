 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    async processData() {
        try {
            const [result1, result2] = await Promise.all([
                this.doTask('Task1', 1000),
                this.doTask('Task2', 500)
            ]);

            return this.finalize({ result1, result2 });
        } catch (error) {
            console.error('Error processing data:', error);
        }
    }

    doTask(taskName, delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.1) {  
                    return reject(`Error in ${taskName}`);
                }
                resolve(`${taskName} completed`);
            }, delay);
        });
    }

    finalize({ result1, result2 }) {
        print('Finalizing results:', result1, result2);
        return 'All tasks completed successfully';
    }
}

 
(async () => {
    const processor = new DataProcessor(['item1', 'item2']);
    const result = await processor.processData();
    print(result);
})();
