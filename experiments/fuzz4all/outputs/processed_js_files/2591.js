 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncNumberGenerator() {
    for (let i = 0; i < 5; i++) {
        await delay(1000);  
        yield i;
    }
}

 
const processNumbers = async ([first, ...rest]) => {
    const results = [];
    const multiplier = 2;

    for await (const num of asyncNumberGenerator()) {
        results.push(num * multiplier);
    }

    print(`First: ${first}, Rest: [${rest.join(', ')}], Results after async multiplication: [${results.join(', ')}]`);
};

 
const numberArray = Array.from(new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]).values());

 
processNumbers(numberArray);
