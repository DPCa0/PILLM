class AsyncTimer {
    constructor() {
        this.tasks = [];
    }

    addTask(delay, callback) {
        this.tasks.push({ delay, callback });
        return this;  
    }

    async start() {
        for (let { delay, callback } of this.tasks) {
            await new Promise(resolve => setTimeout(resolve, delay));
            callback();
        }
    }
}

const generateRandomNumber = () => Math.floor(Math.random() * 100);

 
const asyncRandomNumber = async () => {
    return new Promise(resolve => setTimeout(() => {
        const number = generateRandomNumber();
        resolve(number);
    }, 1000));
};

(async () => {
    try {
        const asyncTimer = new AsyncTimer();
        for (let i = 0; i < 5; i++) {
            let randomNumber = await asyncRandomNumber();
            asyncTimer.addTask(i * 500, () => print(`Task ${i + 1}: Random Number - ${randomNumber}`));
        }

        print("Starting tasks...");
        await asyncTimer.start();
        print("All tasks completed!");
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
