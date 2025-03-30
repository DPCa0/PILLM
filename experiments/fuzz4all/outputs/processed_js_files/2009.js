 

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const processData = ({ results }) => {
    return results.map(({ name, email }) => ({ name, email }));
};

const logResults = (people) => {
    console.table(people);
};

(async () => {
    try {
        const apiURL = 'https://randomuser.me/api/?results=5';
        const data = await fetchData(apiURL);
        const processedData = processData(data);
        const sortedData = [...processedData].sort((a, b) => a.name.first.localeCompare(b.name.first));
        logResults(sortedData);
    } catch ({ message }) {
        console.error('Error fetching data:', message);
    }
})();
