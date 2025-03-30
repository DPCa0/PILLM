Certainly! Here is a JavaScript program that utilizes advanced features like asynchronous programming with `async/await`, Promises, destructuring, and template literals.

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    return await response.json();
};

const processData = ({ id, name, address: { city, state }, company: { name: companyName } }) => {
    return `ID: ${id}\nName: ${name}\nLocation: ${city}, ${state}\nCompany: ${companyName}`;
};

(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/users/1';
        const userData = await fetchData(url);
        print(processData(userData));
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();

This script fetches user data from a placeholder API, uses destructuring to extract certain details, and logs a formatted string to the console.