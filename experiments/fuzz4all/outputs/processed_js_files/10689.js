class CustomArray extends Array {
    flatMapAsync = async (callback) => {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(...await callback(this[i], i, this));
        }
        return result;
    };
}

const processItems = async (item) => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    return item * 2;
};

(async () => {
    const inputArray = new CustomArray(1, 2, 3, 4, 5);
    
    const mappedArray = await inputArray.flatMapAsync(async (x) => {
        const result = await processItems(x);
        return [result, result + 1];
    });
    
    print('Input Array:', inputArray);
    print('Mapped Array:', mappedArray);

    const object = { name: 'Alice', age: 30, profession: 'Developer' };
    const updatedObject = {
        ...object,
        age: 31,
        ...{ city: 'Wonderland', hobby: 'Coding' }
    };
    
    print('Updated Object:', updatedObject);

    const { city, ...rest } = updatedObject;
    print('City:', city);
    print('Rest of the Object:', rest);

    const numbers = [1, 2, 3];
    const total = numbers.reduce((acc, number) => acc + number, 0);
    print('Total:', total);

    const fibonacci = (n, memo = {}) => {
        if (n <= 1) return n;
        if (n in memo) return memo[n];
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    };
    print('Fibonacci(10):', fibonacci(10));
})();
