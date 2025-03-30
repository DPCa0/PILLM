 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

 
const delay = () => {
    return new Promise(resolve => {
        const time = Math.floor(Math.random() * 3000) + 1000;  
        setTimeout(() => resolve(time), time);
    });
};

 
async function performAsyncTask() {
    try {
        const time = await delay();
        print(`Task completed in ${time} milliseconds`);
        if (time > 2000) {
            throw new CustomError('Task took too long!');
        }
    } catch (error) {
        if (error instanceof CustomError) {
            console.error(`Custom error: ${error.message}`);
        } else {
            console.error(`Unexpected error: ${error}`);
        }
    }
}

 
function* numberGenerator() {
    let number = 1;
    while (true) {
        yield number++;
    }
}

const generator = numberGenerator();

 
(async function main() {
    print('Program started');
    const promises = [...Array(3)].map(() => performAsyncTask());
    await Promise.all(promises);
    
    print('Generating numbers:');
    for (let i = 0; i < 5; i++) {
        print(generator.next().value);
    }
    print('Program completed');
})();
