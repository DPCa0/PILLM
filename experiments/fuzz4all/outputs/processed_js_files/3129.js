 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchUserData(id) {
    print(`Fetching data for user ${id}...`);
    await delay(1000);  
    if (id > 3) throw new Error('User not found!');
    return { id, name: `User${id}`, email: `user${id}@example.com` };
}

 
function* numberGenerator() {
    let i = 1;
    while (true) yield i++;
}

 
async function processUsers() {
    const gen = numberGenerator();  
    for (const _ of Array(5)) {  
        try {
            const userId = gen.next().value;  
            const userData = await fetchUserData(userId);
            print(`Received user data:`, userData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

 
const handler = {
    get: (obj, prop) => {
        print(`Accessing property "${prop}"`);
        return obj[prop];
    }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
print(user.name);  
print(user.age);   

 
processUsers();
