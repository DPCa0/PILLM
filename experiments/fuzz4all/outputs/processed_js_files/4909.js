 
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

 
const getUserInput = (query) => {
    return new Promise(resolve => readline.question(query, resolve));
};

(async () => {
    try {
         
        let [first, second] = [1, 2];

         
        print(`Initial values: first = ${first}, second = ${second}`);

         
        [first, second] = [second, first];
        print(`Swapped values: first = ${first}, second = ${second}`);

         
        const concat = (delimiter, ...args) => args.join(delimiter);
        print(concat(' - ', 'a', 'b', 'c', 'd'));

         
        const squared = [1, 2, 3, 4].map(x => x * x);
        print(`Squared: ${squared}`);

         
        const name = await getUserInput('Enter your name: ');

         
        const user = {
            [name]: 'Hello',
            message: `Welcome to advanced JavaScript, ${name}!`
        };

        print(user);
        
    } catch (error) {
        console.error(`Error encountered: ${error}`);
    } finally {
         
        readline.close();
    }
})();
