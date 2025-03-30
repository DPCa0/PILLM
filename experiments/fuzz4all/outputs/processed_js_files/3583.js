 

function* numberGenerator(limit) {
    for (let i = 0; i <= limit; i++) {
        yield i;
    }
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processNumbers(limit) {
    const gen = numberGenerator(limit);

    for (let num of gen) {
        await delay(500);
        print(`Processed number: ${num}`);
    }
}

(async () => {
    const nums = [3, 5, 7];
    const processPromises = nums.map(num => processNumbers(num));

    try {
        await Promise.all(processPromises);
        print("All numbers processed");
    } catch (err) {
        console.error("Error in processing numbers:", err);
    }
})();
