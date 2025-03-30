class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *generateSequence() {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    memoized(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        
        const value = this.memoized(n - 1) + this.memoized(n - 2);
        this.memo.set(n, value);
        
        return value;
    }
}

const fibonacci = new Fibonacci(10);
const sequence = [...fibonacci.generateSequence()];

print('Generated Sequence:', sequence);

const memoizedValue = fibonacci.memoized(10);
print('Memoized 10th Fibonacci number:', memoizedValue);

 
async function delayedCalculation() {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    await wait(1000);
    print('Delayed Calculation Complete');
}

(async () => {
    print('Starting async operation...');
    await delayedCalculation();
    print('Async operation complete.');
})();

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting ${prop}`);
            return target[prop];
        } else {
            console.warn(`Property ${prop} does not exist`);
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
    }
};

const person = new Proxy({ name: 'Alice', age: 30 }, handler);

print(person.name);
person.age = 31;
print(person.age);
print(person.height);  
