 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchData() {
     
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            resolve([1, 2, 3, 4, 5]);
        }, 1000);
    });
    return data;
}

 
async function processData() {
    const data = await fetchData();

     
    const transformedData = data
        .map((x) => x * 2)  
        .filter((x) => x > 5)  
        .reduce((acc, curr) => acc + curr, 0);  

    return transformedData;
}

 
(async () => {
     
    const fib = fibonacci();

    print("First 5 Fibonacci numbers generated: ");
    for (let i = 0; i < 5; i++) {
        print(fib.next().value);
    }

    print("\nProcessing fetched data...");
    const result = await processData();
    print(`Result after processing: ${result}`);
})();
