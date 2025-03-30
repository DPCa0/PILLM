 
class AdvancedMath {
    constructor() {
         
        this[AdvancedMath._factorial] = this[AdvancedMath._factorial].bind(this);
    }

     
    static _factorial = Symbol('factorial');

     
    factorial(n) {
        if (n < 0) throw new Error('Negative numbers are not allowed.');
        return this[AdvancedMath._factorial](n);
    }

     
    [AdvancedMath._factorial](n) {
        return n <= 1 ? 1 : n * this[AdvancedMath._factorial](n - 1);
    }

     
    *fibonacci(n) {
        let a = 0, b = 1, temp;
        while (n-- > 0) {
            yield a;
            temp = a;
            a = b;
            b = temp + b;
        }
    }

     
    static async asyncOperation(fn) {
        const result = await Promise.resolve(fn());
        return result;
    }
}

 
(async () => {
    const advMath = new AdvancedMath();

     
    print('5! =', advMath.factorial(5));

     
    print('Fibonacci series up to 5 terms:');
    for (const num of advMath.fibonacci(5)) {
        print(num);
    }

     
    const asyncResult = await AdvancedMath.asyncOperation(() => 'Async operation complete');
    print(asyncResult);
})();
