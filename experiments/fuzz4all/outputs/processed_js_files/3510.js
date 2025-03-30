 

 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { message: 'Hello, world!', status: 'success' };
            Math.random() > 0.5 ? resolve(data) : reject(new Error('Failed to fetch data'));
        }, 1000);
    });
};

 
const processData = async () => {
    try {
        const { message, status } = await fetchData();
        print(`Status: ${status}, Message: ${message}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

 
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(num => num ** 2);
print(`Squared Numbers: ${squaredNumbers}`);

 
processData();

 
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(values => {
    print(`Promise.all resolved values: ${values}`);
});
