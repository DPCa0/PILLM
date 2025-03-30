 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fetchDataGenerator() {
    print('Fetching user data...');
    yield delay(1000).then(() => print('User data fetched'));

    print('Fetching orders...');
    yield delay(1500).then(() => print('Orders fetched'));

    print('Fetching additional information...');
    yield delay(500).then(() => print('Additional information fetched'));
}

 
async function executeGenerator(gen) {
    const generator = gen();
    let result = generator.next();
    while (!result.done) {
        await result.value;
        result = generator.next();
    }
}

 
(async function main() {
    print('Starting complex async operations using Generators and Promises');
    await executeGenerator(fetchDataGenerator);
    print('All async operations completed');
})();
