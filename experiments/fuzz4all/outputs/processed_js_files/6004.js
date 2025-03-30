 

(async () => {
     
    function* sequenceGenerator(start = 0, end = 10, step = 1) {
        for (let i = start; i <= end; i += step) {
            yield i;
        }
    }

     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

     
    async function processData([first, second, ...rest]) {
        await delay(1000);
        return { first, second, rest };
    }

     
    const generator = sequenceGenerator(1, 5);
    const numbers = [...generator];  

    print("Generated Numbers:", numbers);

     
    const { first, second, rest } = await processData(numbers);

    print("First Number:", first);
    print("Second Number:", second);
    print("Rest of the Numbers:", rest);

     
    const info = new Map([
        ['first', `First processed number is ${first}`],
        ['second', `Second processed number is ${second}`],
        ['rest', `Rest of the processed numbers are ${rest.join(', ')}`]
    ]);

    print("\nInformation:");
    for (const [key, value] of info) {
        print(`${key.toUpperCase()}: ${value}`);
    }

})();
