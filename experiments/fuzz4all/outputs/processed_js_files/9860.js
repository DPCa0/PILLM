 
const fs = require('fs');
const os = require('os');

 
async function getUserInfo() {
     
    const { username, homedir } = os.userInfo();
    return { username, homedir };
}

 
function* squareNumbers(arr) {
    for (const num of arr) {
        yield num ** 2;
    }
}

 
const loggerHandler = {
    get(target, property) {
        print(`Property '${property}' accessed with value: ${target[property]}`);
        return target[property];
    }
};

const sampleObj = new Proxy({ name: "JavaScript", type: "Language" }, loggerHandler);

async function main() {
     
    const { username, homedir } = await getUserInfo();
    print(`User Info: Username - ${username}, Home Directory - ${homedir}`);

     
    const numbers = [1, 2, 3, 4];
    const squared = [...squareNumbers(numbers)];
    print('Squared Numbers:', squared);

     
    print(sampleObj.name);
    print(sampleObj.type);

     
    const sum = (base, ...numbers) => numbers.reduce((acc, num) => acc + num, base);
    print('Sum:', sum(10, ...squared));

     
    fs.writeFile('output.txt', `Squared Numbers: ${squared.join(', ')}`, (err) => {
        if (err) throw err;
        print('Output saved to output.txt');
    });
}

 
(async () => {
    await main();
})();
