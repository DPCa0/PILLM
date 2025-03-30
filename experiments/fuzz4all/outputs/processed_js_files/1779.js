class AsyncMath {
    static async add(a, b) {
        return new Promise((resolve) => setTimeout(() => resolve(a + b), 1000));
    }
    
    static async multiply(a, b) {
        return new Promise((resolve) => setTimeout(() => resolve(a * b), 1000));
    }
    
    static async calculateComplexExpression(a, b, c) {
        const sum = await AsyncMath.add(a, b);
        const product = await AsyncMath.multiply(sum, c);
        return product;
    }
}

(async () => {
    try {
        const values = [2, 3, 4];
        const result = await AsyncMath.calculateComplexExpression(...values);
        
        const [date, resultMessage] = new Proxy([new Date(), `The result is: ${result}`], {
            get(target, prop) {
                if (prop === '0') {
                    return target[prop].toLocaleString();
                }
                return target[prop];
            },
        });
        
        const taggedTemplate = (strings, ...keys) => {
            return strings.reduce((result, str, i) => {
                return `${result}${str}${keys[i] || ''}`;
            }, '');
        };

        print(taggedTemplate`[${date}] - Calculation Finished: ${resultMessage}`);
    } catch (error) {
        console.error('Error:', error);
    }
})();
