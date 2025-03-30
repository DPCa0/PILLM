 
const iterableObject = {
    [Symbol.iterator]: function* () {
        let i = 0;
        while (i < 3) {
            yield i++;
        }
    }
};

 
const asyncOperation = (num) => new Promise((resolve) => setTimeout(() => resolve(num * 2), 100));

async function processNumbers() {
    for await (const num of iterableObject) {
        let result = await asyncOperation(num);
        print(`Processed number: ${result}`);
    }
}

 
const handler = {
    apply: function(target, thisArg, argumentsList) {
        print('Processing started');
        return target.apply(thisArg, argumentsList).finally(() => print('Processing finished'));
    }
};

const proxiedProcessNumbers = new Proxy(processNumbers, handler);

 
const data = { a: 1, b: 2, c: 3 };
const dataMap = new Map(Object.entries(data));
const uniqueValues = new Set(dataMap.values());

 
const multiplyValues = (...args) => args.map(val => val * 2);
const results = multiplyValues(...uniqueValues);

print('Initial Results:', results);

 
proxiedProcessNumbers();
