 

function* createSequence() {
    yield 'This';
    yield 'is';
    yield 'a';
    yield 'complex';
    yield 'JavaScript';
    yield 'program!';
}

async function processItem(item) {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(item);
            resolve();
        }, 500);
    });
}

async function processSequence(sequence) {
    for (const item of sequence) {
        await processItem(item);
    }
}

(async function main() {
    const sequence = createSequence();
    await processSequence(sequence);
    print("Sequence processing complete.");
})();
