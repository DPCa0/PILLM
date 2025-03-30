Certainly! Here's a JavaScript program that utilizes advanced features, including async/await, Promises, destructuring, and the fetch API to make a network request and handle data:

const getUserData = async (userId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const userData = await response.json();
        const { name, email, address: { city } } = userData;

        return { name, email, city };
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const displayUserData = async (userId) => {
    try {
        const { name, email, city } = await getUserData(userId);
        print(`Name: ${name}, Email: ${email}, City: ${city}`);
    } catch (error) {
        console.error('Failed to display user data:', error);
    }
};

(async () => {
    for (let userId of [1, 2, 3]) {
        await displayUserData(userId);
    }
})();

This script fetches user data from a public API and logs details to the console using advanced JavaScript features.