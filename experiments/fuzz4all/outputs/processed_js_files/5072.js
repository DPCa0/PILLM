 
class Robot {
    constructor(name) {
        this.name = name;
    }

     
    greet = () => `Hello, I am ${this.name}`;
}

 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data fetched');
        }, 2000);
    });
};

const processData = async () => {
    try {
        print('Fetching data...');
        const data = await fetchData();
        print(data);
    } catch (error) {
        console.error('Error:', error);
    }
};

 
const processNumbers = (a, b, ...rest) => {
    const [first, second] = rest;
    return (first + second) * (a + b);
};

 
const main = async () => {
    const robot = new Robot('HAL 9000');
    print(robot.greet());

    await processData();

    const numbers = [1, 2, 3, 4];
    print(`Processed numbers result: ${processNumbers(...numbers)}`);
};

 
(async () => {
    await main();
})();
