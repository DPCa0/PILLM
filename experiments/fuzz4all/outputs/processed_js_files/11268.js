const fetch = require('node-fetch');

 
async function fetchUserData() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await response.json();

         
        let transformedUsers = users.map(({ id, name, email, address: { city } }) => ({
            id,
            fullName: name.toUpperCase(),
            contact: `${name.split(' ')[0].toLowerCase()}@${city.replace(/\s/g, '').toLowerCase()}.com`,
            location: city
        }));

         
        for (let [index, user] of transformedUsers.entries()) {
            print(`${index + 1}. ID: ${user.id}, Name: ${user.fullName}, Email: ${user.contact}, City: ${user.location}`);
        }
    } catch (error) {
        console.error("Error fetching users: ", error);
    }
}

 
(async () => {
    await fetchUserData();
})();
