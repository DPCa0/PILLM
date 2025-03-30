 

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (limit--) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
function asyncApiCall(num) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 1000);
        setTimeout(() => {
            resolve(`Fetched data for number: ${num}`);
        }, delay);
    });
}

 
async function processFibonacci() {
    const fibSequence = fibonacci(10);
    for (const num of fibSequence) {
        const result = await asyncApiCall(num);
        print(result);
    }
}

 
let a = 5, b = 10;
[a, b] = [b, a];
print(`Swapped values: a = ${a}, b = ${b}`);

 
processFibonacci();
