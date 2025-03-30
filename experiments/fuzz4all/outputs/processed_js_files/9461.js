 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* generateNumbers() {
    yield* [1, 2, 3, 4, 5];
}

const proxiedData = new Proxy({ numbers: generateNumbers() }, {
    get(target, property) {
        if (property === 'numbers') {
            const numbers = [...target[property]];
            return numbers.map(num => num * 2);
        }
        return Reflect.get(...arguments);
    }
});

async function processData({ numbers }) {
    print('Processing numbers...');
    for (const number of numbers) {
        await delay(1000);
        print(`Processed number: ${number}`);
    }
    return 'Processing complete!';
}

(async () => {
    const result = await processData(proxiedData);
    print(result);
})();
