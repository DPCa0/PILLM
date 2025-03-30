 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
}

function processUserData({ name, address: { city, street }, company: { name: companyName } }) {
    return `User ${name} lives on ${street}, ${city} and works at ${companyName}.`;
}

(async function () {
    try {
        const url = 'https://jsonplaceholder.typicode.com/users/1';
        const userData = await fetchData(url);
        const result = processUserData(userData);
        print(result);
    } catch (error) {
        console.error(`Failed to fetch or process data: ${error.message}`);
    }
})();
