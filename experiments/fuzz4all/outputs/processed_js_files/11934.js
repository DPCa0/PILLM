 

 
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
async function asyncSum(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}"`);
        return target[prop];
    }
};

const map = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3]
]);

const proxiedMap = new Proxy(map, handler);

 
(async () => {
    print('Starting calculations...');

     
    const numbers = Array.from(range(1, 5));

     
    const sum = await asyncSum(numbers);
    print(`The sum is: ${sum}`);

     
    proxiedMap.get('a');
    proxiedMap.get('b');

    print('Done!');
})();
