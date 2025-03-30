Certainly! Below is a JavaScript program that utilizes advanced features such as async/await, promises, destructuring, template literals, and modules to fetch user data from an API and display it in a formatted manner. 

**File: `main.js`**
import fetchUserData from './userData.js';

(async () => {
    try {
        const { id, name, email } = await fetchUserData(1);
        print(`User Info:\nID: ${id}\nName: ${name}\nEmail: ${email}`);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
})();

**File: `userData.js`**
export default async function fetchUserData(userId) {
    const response = await fetch(`https: 
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

In this example, the `main.js` file imports a function from `userData.js`. The `fetchUserData` function makes an asynchronous call to a fake online REST API and returns the user data. This data is then destructured into individual variables for easy logging using template literals.