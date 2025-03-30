Certainly! Here's a complex JavaScript program that uses advanced features like Promises, async/await, arrow functions, destructuring, template literals, and spread/rest operators:

// Example of a function using async/await, Promises, destructuring, and template literals
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const { results } = await response.json(); // Destructuring
        return results;
    } catch (error) {
        console.error(`Failed to fetch data: ${error.message}`);
    }
};

// Example of using the spread operator and Array methods with Promise.all
const processUserData = async (...urls) => {
    const fetchPromises = urls.map(url => fetchData(url));
    const userData = await Promise.all(fetchPromises);
    userData.flat().forEach(({ name, email }, index) => {
        print(`User ${index + 1}: ${name} (${email})`);
    });
};

// Example URLs for fetching user data
const userUrls = [
    'https: 
    'https://jsonplaceholder.typicode.com/users?_page=2'
];

 
(() => processUserData(...userUrls))();

This program fetches user data from two URLs, handles potential errors, and logs the user information to the console using various JavaScript features.