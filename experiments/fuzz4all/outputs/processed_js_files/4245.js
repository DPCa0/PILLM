 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

 
function processUsers(users) {
    return users.map(({ id, name, email }) => ({
        id,
        name: name.toUpperCase(),
        email
    }));
}

 
function displayData(callback, data) {
    const processedData = callback(data);
    processedData.forEach(({ id, name, email }) => {
        print(`ID: ${id}, Name: ${name}, Email: ${email}`);
    });
}

 
(async () => {
    try {
         
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';
         
        const users = await fetchData(apiUrl);
        displayData(processUsers, users);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
