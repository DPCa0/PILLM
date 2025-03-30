 
async function* complexAsyncGenerator(arr) {
    for (let item of arr) {
        yield new Promise(resolve => setTimeout(() => resolve(item * 2), 1000));
    }
}

async function processArray(arr) {
    const results = [];
    for await (const value of complexAsyncGenerator(arr)) {
        results.push(value);
    }
    return results;
}

const main = async () => {
    const nums = [1, 2, 3, 4, 5];
    print('Original Array:', nums);

    const doubledNums = await processArray(nums);
    print('Processed Array:', doubledNums);

    const [first, second, ...rest] = doubledNums;
    print('Destructured Values:', { first, second, rest });

    const promiseChain = doubledNums.reduce((chain, num) => {
        return chain.then(() => new Promise(resolve => {
            setTimeout(() => {
                print('Processed:', num);
                resolve();
            }, 500);
        }));
    }, Promise.resolve());

    await promiseChain;
    print('All numbers processed.');
};

main().catch(console.error);
