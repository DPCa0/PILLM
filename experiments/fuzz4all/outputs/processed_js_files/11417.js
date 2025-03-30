 

function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function printNumbers() {
    const gen = numberGenerator();
    for await (const num of gen) {
        print(num);
        if (num === 10) break;  
        await delay(500);  
    }
}

(async () => {
    print("Starting number sequence:");
    await printNumbers();
    print("Sequence complete!");
})();
