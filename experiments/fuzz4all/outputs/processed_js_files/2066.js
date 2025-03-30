 

 
export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

 
export const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
];

 
import { wait } from './util.js';
import { users } from './data.js';

(async function processUsers() {
    const getUserDetails = async () => {
        await wait(1000);
        return users;
    };

    const filterAdults = (usersList) => usersList.filter(({ age }) => age >= 30);

    try {
        const allUsers = await getUserDetails();
        const [firstUser, ...otherUsers] = allUsers;

        print('First User:', firstUser);

        const adultUsers = filterAdults(otherUsers);
        print('Adult Users:', adultUsers);
        
        const summary = adultUsers.map(({ name, age }) => `${name}, Age: ${age}`);
        print('Summary:', ...summary);
    } catch (error) {
        console.error('Error processing users:', error);
    }
})();
