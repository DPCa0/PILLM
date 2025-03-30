 
async function delayedMessage(delay, message) {
    return new Promise(resolve => setTimeout(() => resolve(message), delay));
}

 
async function complexExample() {
     
    const numSet = new Set([1, 2, 3, 4, 5]);
    const numMap = new Map([...numSet].map(num => [num, num * num]));

    print('Map of numbers and their squares:', numMap);

     
    const [first, ...rest] = [...numSet];
    print(`First: ${first}, Rest: ${rest}`);

     
    const user = { name: "Alice", age: 25 };
    const contact = { email: "alice@example.com" };
    const fullProfile = { ...user, ...contact };

    print('Full User Profile:', fullProfile);

     
    print('Fetching delayed message...');
    const message = await delayedMessage(1000, 'Hello, world!');
    print(message);
}

 
const handler = {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        } else {
            return `Property "${property}" is not available.`;
        }
    }
};

const person = new Proxy({ name: 'John', age: 30 }, handler);
print('Proxy Example:', person.name);
print('Proxy Example:', person.location);

 
complexExample().then(() => print('Complex Example Execution Complete.'));
