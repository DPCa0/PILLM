 
async function fetchUserData(userId) {
    try {
         
        let response = await fetch(`https: 
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let data = await response.json();
        
         
        const { name, email, address: { city } } = data;
        
         
        print(`User: ${name}, Email: ${email}, City: ${city}`);
    } catch (error) {
        console.error(`Failed to fetch user data: ${error.message}`);
    }
}

 
function logExecutionTime(fn) {
    return async function(...args) {
        console.time('Execution Time');
        await fn(...args);
        console.timeEnd('Execution Time');
    };
}

 
const handler = {
    set: function(obj, prop, value) {
        if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
            throw new TypeError('Age must be a positive number');
        }
        obj[prop] = value;
        return true;
    }
};

let person = new Proxy({}, handler);
person.name = 'Alice';
person.age = 30;

print(person);

 
async function fetchMultipleUsers(userIds) {
    try {
        const promises = userIds.map(id => fetch(`https: 
        const responses = await Promise.all(promises);
        const users = await Promise.all(responses.map(res => res.json()));
        
        users.forEach(user => print(`Fetched user: ${user.name}`));
    } catch (error) {
        console.error(`Failed to fetch multiple users: ${error.message}`);
    }
}

 
fetchUserData(1).then(() => fetchMultipleUsers([2, 3, 4]));
const fetchWithLogging = logExecutionTime(fetchUserData);
fetchWithLogging(5);
