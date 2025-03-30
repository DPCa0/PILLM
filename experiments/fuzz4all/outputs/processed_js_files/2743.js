 
function reverse(strings, ...values) {
    let result = strings[0];
    values.forEach((value, i) => {
        result += `${String(value).split('').reverse().join('')}${strings[i + 1]}`;
    });
    return result;
}

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function asyncFibonacci(n) {
    const fibSeq = fibonacci();
    const fibNumbers = [];
    for (let i = 0; i < n; i++) {
        fibNumbers.push(fibSeq.next().value);
    }
    return fibNumbers;
}

 
(async () => {
    try {
        const fibNumbers = await asyncFibonacci(10);
         
        const [first, second, ...rest] = fibNumbers;
        
        print(`First two Fibonacci numbers: ${first}, ${second}`);
        print(`Other Fibonacci numbers: ${rest.join(', ')}`);

         
        print(reverse`Reversed Fibonacci numbers: ${rest.join(', ')}`);
    } catch (error) {
        console.error("Error:", error);
    }
})();
