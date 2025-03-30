 
const complexOperation = (...numbers) => {
     
    const sum = numbers.reduce((acc, num) => acc + num, 0);

     
    const handler = {
        get: (obj, prop) => {
            if (prop in obj) {
                print(`Accessing ${prop} which is ${obj[prop]}`);
                return obj[prop];
            } else {
                print(`Property ${prop} does not exist on result`);
                return undefined;
            }
        }
    };

     
    const result = {
        get sum() {
            return sum;
        },
        get average() {
            return sum / numbers.length;
        },
        get variance() {
            const avg = this.average;
            return numbers.reduce((acc, num) => acc + (num - avg) ** 2, 0) / numbers.length;
        }
    };

     
    return new Proxy(result, handler);
};

 
const values = [2, 4, 6, 8, 10];
const results = complexOperation(...values);

 
const { sum, average, variance } = results;
print(`Sum: ${sum}, Average: ${average}, Variance: ${variance}`);

 
(async () => {
     
    const delayedCalculation = () => new Promise(resolve => setTimeout(() => {
        print("Delayed computation done");
        resolve();
    }, 1000));

    await delayedCalculation();

    print(`Re-accessing Variance after delay: ${results.variance}`);
})();
