 
async function fetchRandomUser() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const { results } = await response.json();
        const [user] = results;

         
        const { name: { first, last }, location: { city, country }, ...rest } = user;

         
        print(formatUser`User: ${first} ${last}, Location: ${city}, ${country}`);
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

 
function formatUser(strings, ...values) {
    return strings.reduce((acc, str, idx) => acc + str + (values[idx] || ''), '');
}

 
class RandomNumberGenerator {
    #randomNumber;

    constructor() {
        this.#randomNumber = Math.floor(Math.random() * 100);
    }

    get number() {
        return this.#randomNumber;
    }

    static generate() {
        return new RandomNumberGenerator().number;
    }
}

 
async function randomOperations() {
    const operations = [
        fetchRandomUser(),
        new Promise((resolve, reject) => setTimeout(() => resolve(RandomNumberGenerator.generate()), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject('Operation failed'), 500))
    ];

    const results = await Promise.allSettled(operations);

    const successful = results
        .filter(({ status }) => status === 'fulfilled')
        .map(({ value }) => value);

    successful.forEach(result => print(result?.toString()));
}

randomOperations();
