 

function* numberGenerator(limit) {
    for (let i = 1; i <= limit; i++) {
        yield i;
    }
}

async function getData(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num % 2 === 0) {
                resolve(`Even number: ${num}`);
            } else {
                reject(`Odd number: ${num}`);
            }
        }, 1000);
    });
}

async function processData(generator) {
    for (let num of generator) {
        try {
            let message = await getData(num);
            print(message);
        } catch (error) {
            console.error(error);
        }
    }
}

const limit = 5;
const generator = numberGenerator(limit);
processData(generator);
