 
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Property '${prop}' accessed.`);
        return Reflect.get(target, prop, receiver);
    }
};

 
const userData = new Proxy({ name: "Alice", age: 30 }, handler);

 
async function* fetchData() {
    const dataPoints = ["Point A", "Point B", "Point C"];
    for (const point of dataPoints) {
         
        await new Promise(resolve => setTimeout(resolve, 500));
        yield point;
    }
}

 
(async () => {
    print(`User: ${userData.name}, Age: ${userData.age}`);
    
     
    const responses = await Promise.all([
        (async () => {
            const dataGen = fetchData();
            for await (const data of dataGen) {
                print(`Fetched: ${data}`);
            }
        })(),
        new Promise((resolve) => {
            readline.question("Enter something: ", userInput => {
                print(`You entered: ${userInput}`);
                readline.close();
                resolve(userInput);
            });
        })
    ]);
    
    print('All operations completed.');
})();
