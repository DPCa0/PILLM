 
import fs from 'fs/promises';

 
async function readJSONFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        print('File content:', jsonData);
        return jsonData;
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}`);
            return target[property];
        }
        return `Property ${property} does not exist.`;
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
print(user.name);  
user.age = 31;  
print(user.age);  
print(user.height);  

 
const uniqueID = (() => {
    const id = Symbol('id');
    return id;
})();

 
const userMap = new Map();
userMap.set(uniqueID, user);

print('User from map:', userMap.get(uniqueID));

 
const sum = (...nums) => nums.reduce((acc, num) => acc + num, 0);

print('Sum:', sum(1, 2, 3, 4, 5));

 
const userInfo = { profile: { name: 'Bob', email: null } };
print(userInfo.profile?.name ?? 'No name');  
print(userInfo.profile?.phone ?? 'No phone number');  

 
(async () => {
    const filePath = './data.json';
    await readJSONFile(filePath);
})();
