class Fibonacci {
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        for (;;) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
}

(async () => {
    const calculate = async (n) => {
        const fib = new Fibonacci();
        const numbers = [...fib].slice(0, n);
        
        const calculateSum = (nums) => 
            nums.reduce((sum, num) => sum + num, 0);

        return calculateSum(numbers);
    };

    const n = 10;
    const sumOfFibonacci = await calculate(n);
    print(`The sum of the first ${n} Fibonacci numbers is ${sumOfFibonacci}`);
})();
