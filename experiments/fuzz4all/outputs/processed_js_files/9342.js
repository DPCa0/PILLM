 

 
const apiURL = 'https://jsonplaceholder.typicode.com/users';

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function processData() {
    try {
        const users = await fetchData(apiURL);

         
        const processedUsers = users
            .filter(user => user.address.geo.lat > 0)  
            .map(user => ({
                id: user.id,
                name: user.name.toUpperCase(),  
                city: user.address.city
            }));

         
        for (const { id, name, city } of processedUsers) {
            print(`ID: ${id}, Name: ${name}, City: ${city}`);
        }

         
        await Promise.all(processedUsers.map(user =>
            new Promise((resolve) => {
                setTimeout(() => {
                    print(`Processed user: ${user.name}`);
                    resolve();
                }, Math.random() * 1000);
            })
        ));

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
(async () => {
    await processData();
})();
