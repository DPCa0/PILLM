 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
    print("Fetching data...");
    await delay(1000);  
    print("Data fetched!");
    return { data: 'Sample data' };
}

 
function* processData() {
    const response = yield fetchData();
    print("Processing:", response.data);
    yield delay(500);  
    print("Data processed!");
}

 
async function handleAsyncGenerator(genFunc) {
    const generator = genFunc();
    let result = generator.next();

    while (!result.done) {
        if (result.value instanceof Promise) {
             
            const value = await result.value;
            result = generator.next(value);
        } else {
             
            result = generator.next(result.value);
        }
    }
}

 
handleAsyncGenerator(processData);
