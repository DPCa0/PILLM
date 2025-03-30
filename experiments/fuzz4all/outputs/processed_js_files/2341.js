const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
};

const processData = ({ results }) => {
    return results.map(({ name, email }) => ({ name, email }));
};

const logResults = ({ name, email }) => {
    print(`Name: ${name}, Email: ${email}`);
};

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/users');
        const processedData = processData({ results: data });
        processedData.forEach(logResults);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
