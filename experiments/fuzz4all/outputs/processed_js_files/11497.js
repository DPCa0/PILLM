 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
function* fibonacciGenerator(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
class SecretManager {
    #secret;

    constructor(secret) {
        this.#secret = secret;
    }

    getSecret() {
        return this.#secret;
    }

    static hashSecret(secret) {
        return secret.split('').reverse().join('');  
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property "${prop}" not found on object.`);
            return undefined;
        }
    }
};

const person = new Proxy({ name: 'Alice', age: 30 }, handler);

 
(async () => {
     
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const postData = await fetchData(url);
    print('Fetched Data:', postData);

     
    print('Fibonacci sequence:');
    const fib = fibonacciGenerator(5);
    for (const num of fib) {
        print(num);
    }

     
    const manager = new SecretManager('mySecretPassword');
    print('Retrieved Secret:', manager.getSecret());
    print('Hashed Secret:', SecretManager.hashSecret(manager.getSecret()));

     
    print('Person Name:', person.name);
    print('Person Occupation:', person.occupation);
})();
