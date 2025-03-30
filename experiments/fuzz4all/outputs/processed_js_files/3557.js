class AsyncMath {
    static async factorial(n) {
        if (n < 0) throw new Error("Negative numbers not allowed");
        const result = await AsyncMath._factorialRecursive(n);
        return result;
    }

    static async _factorialRecursive(n) {
        if (n <= 1) return 1;
        const intermediate = await AsyncMath._factorialRecursive(n - 1);
        return n * intermediate;
    }

    static async* fibonacci(max) {
        let [a, b] = [0, 1];
        while (a <= max) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

(async () => {
    try {
        const num = 5;
        const fact = await AsyncMath.factorial(num);
        print(`Factorial of ${num} is ${fact}`);

        print(`Fibonacci series up to 50:`);
        for await (const num of AsyncMath.fibonacci(50)) {
            print(num);
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
})();
