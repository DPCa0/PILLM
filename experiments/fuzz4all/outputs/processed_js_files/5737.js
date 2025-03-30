class AsyncMath {
    static async add(a, b) {
        return new Promise((resolve) => setTimeout(() => resolve(a + b), 100));
    }
    
    static async multiply(a, b) {
        return new Promise((resolve) => setTimeout(() => resolve(a * b), 100));
    }
}

const withErrorHandling = (fn) => async (...args) => {
    try {
        return await fn(...args);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const processNumbers = async (numbers) => {
    const [a, b, c] = numbers;
    const safeAdd = withErrorHandling(AsyncMath.add);
    const safeMultiply = withErrorHandling(AsyncMath.multiply);

    const sum = await safeAdd(a, b);
    const product = await safeMultiply(sum, c);

    return { sum, product };
};

(async () => {
    const numbers = [1, 2, 3];
    const { sum, product } = await processNumbers(numbers);
    
    print(`The sum is ${sum}`);
    print(`The product is ${product}`);
})();
