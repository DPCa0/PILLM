 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: "Hello, advanced world!" }), 1000);
    });
};

 
function* asyncGenerator() {
    yield fetchData();
    yield fetchData();
    yield fetchData();
}

 
async function handleAsyncGenerator(gen) {
    const iterator = gen();
    let result = iterator.next();

    while (!result.done) {
        const data = await result.value;
        print(data.data);
        result = iterator.next();
    }
}

 
(async () => {
    print("Starting the async generator:");
    await handleAsyncGenerator(asyncGenerator);
    print("Finished processing async generator.");
})();

 
const complexArray = [1, 2, 3, 4, 5];
const transformedArray = complexArray
    .map(num => num * 2)
    .filter(num => num > 5)
    .reduce((acc, num) => acc + num, 0);

print(`Transformed array result: ${transformedArray}`);
