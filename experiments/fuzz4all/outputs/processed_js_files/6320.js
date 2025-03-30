 

 
function asyncOperation(value, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, delay);
    });
}

 
function* asyncGenerator() {
    print("Starting the async sequence...");
    const result1 = yield asyncOperation("First Result", 1000);
    print(result1);

    const result2 = yield asyncOperation("Second Result", 2000);
    print(result2);

    const result3 = yield asyncOperation("Third Result", 1500);
    print(result3);

    return "Sequence Completed!";
}

 
async function runner(genFunc) {
    const gen = genFunc();
    let result = gen.next();

    while (!result.done) {
        const value = await result.value;
        result = gen.next(value);
    }

    return result.value;
}

 
runner(asyncGenerator).then(finalResult => print(finalResult));
