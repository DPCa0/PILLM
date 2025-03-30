 

 
function* asyncOperationGenerator() {
    print('Starting async operations...');
    yield delay(1000, 'Operation 1 complete');
    yield delay(2000, 'Operation 2 complete');
    yield delay(1000, 'Operation 3 complete');
    print('All operations completed.');
}

 
function delay(ms, message) {
    return new Promise(resolve => setTimeout(() => resolve(message), ms));
}

 
async function runAsyncOperations(generator) {
    const iterator = generator();
    let result = iterator.next();

    while (!result.done) {
        try {
            const message = await result.value;
            print(message);
            result = iterator.next();
        } catch (error) {
            console.error('Error in operation:', error);
            break;
        }
    }
}

 
runAsyncOperations(asyncOperationGenerator);
