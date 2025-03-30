 

 
function* generateNumbers() {
    let i = 1;
    while (true) {
        yield i++;
    }
}

 
async function fetchNumber(generator, times) {
    const numbers = [];
    for (let i = 0; i < times; i++) {
        numbers.push(generator.next().value);
        await new Promise(resolve => setTimeout(resolve, 100));  
    }
    return numbers;
}

 
const arrayHandler = {
    get: (target, prop) => {
        print(`Getting ${prop} from the array`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value} in the array`);
        return Reflect.set(target, prop, value);
    }
};

 
(async function main() {
    const numberGenerator = generateNumbers();
    let numbers = await fetchNumber(numberGenerator, 5);

     
    const proxiedNumbers = new Proxy(numbers, arrayHandler);

     
    print(`Numbers: ${proxiedNumbers.join(', ')}`);
    proxiedNumbers[1] = 42;
    print(`Modified Numbers: ${proxiedNumbers.join(', ')}`);

     
    const promises = proxiedNumbers.map(num => Promise.resolve(num * 2));
    const doubledNumbers = await Promise.all(promises);
    print(`Doubled Numbers: ${doubledNumbers.join(', ')}`);
})();
