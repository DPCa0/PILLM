class AsyncNumber {
    #number;
    
    constructor(num) {
        this.#number = num;
    }
    
    static async generateRandomNumber() {
        return new Promise(resolve => {
            setTimeout(() => {
                const randNum = Math.floor(Math.random() * 100);
                resolve(new AsyncNumber(randNum));
            }, 500);
        });
    }
    
    get number() {
        return this.#number;
    }
    
    async *[Symbol.asyncIterator]() {
        let count = 0;
        while (count < this.#number) {
            yield new Promise(resolve => {
                setTimeout(() => {
                    resolve(count);
                }, 100);
            });
            count++;
        }
    }
}

(async function() {
    const asyncNumber = await AsyncNumber.generateRandomNumber();
    print(`Generated random number: ${asyncNumber.number}`);
    
    print('Iterating:');
    for await (const num of asyncNumber) {
        print(num);
    }
    
    const doubleAndSquare = (num) => ({ 
        double: num * 2, 
        square: num ** 2 
    });
    
    const { double, square } = doubleAndSquare(asyncNumber.number);
    print(`Double: ${double}, Square: ${square}`);
})();
