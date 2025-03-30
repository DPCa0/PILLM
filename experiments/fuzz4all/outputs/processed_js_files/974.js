 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncNumberGenerator() {
    let count = 0;
    while (count < 5) {
        await delay(1000);
        yield count++;
    }
}

 
function logUserInfo({ name, age, address: { city, country } }) {
    print(`User Info: Name - ${name}, Age - ${age}, City - ${city}, Country - ${country}`);
}

 
const user = {
    name: 'Alice',
    age: 30,
    address: {
        city: 'Wonderland',
        country: 'Imagination'
    }
};

 
(async function run() {
    logUserInfo(user);

    print("Starting async number generator...");
    for await (const num of asyncNumberGenerator()) {
        print(`Generated number: ${num}`);
    }

    print("All numbers generated.");
})();
