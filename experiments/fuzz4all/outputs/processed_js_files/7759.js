Certainly! Below is a complex JavaScript program that uses some advanced features like Promises, async/await, destructuring, and the Fetch API:

 
async function fetchData(url) {
    try {
         
        const response = await fetch(url);
        const { results: users } = await response.json();

         
        users.forEach(({ name: { first, last }, email }) => {
            print(`Name: ${first} ${last}, Email: ${email}`);
        });

         
        const promises = users.map(user => processUser(user));
        await Promise.all(promises);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
function processUser({ name: { first, last } }) {
    return new Promise(resolve => {
        setTimeout(() => {
            print(`Processed user: ${first} ${last}`);
            resolve();
        }, 500);
    });
}

 
fetchData('https://randomuser.me/api/?results=5');

This program fetches random user data from an API, logs the users' names and emails, and simulates processing each user with a slight delay using `Promise.all`.