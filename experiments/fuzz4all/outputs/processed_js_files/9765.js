 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const handler = {
    get: (target, prop) => {
        if (prop === 'greet') {
            return target[prop].toUpperCase();
        }
        return Reflect.get(...arguments);
    }
};

const person = new Proxy({ name: 'Alice', greet: 'Hello, world!' }, handler);

 
async function* asyncGenerator() {
    await delay(1000);
    yield 'Step 1 completed';
    await delay(1000);
    yield 'Step 2 completed';
    await delay(1000);
    yield 'Step 3 completed';
}

 
(async () => {
    print(`Person: ${person.name}`);
    print(`Greet: ${person.greet}`);

     
    for await (const step of asyncGenerator()) {
        print(step);
    }

     
    const [firstName, lastName, ...rest] = ['John', 'Doe', 30, 'Developer'];
    print(`First Name: ${firstName}, Last Name: ${lastName}, Rest: ${rest.join(', ')}`);

     
    const user = { profile: { email: null } };
    const email = user.profile?.email ?? 'default@example.com';
    print(`Email: ${email}`);

     
    const numbers = [1, 2, 3, 4, 5];
    const sum = numbers.map(n => n * 2).reduce((acc, curr) => acc + curr, 0);
    print(`Sum of doubled numbers: ${sum}`);
})();
