const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
};

const processData = (data) => {
    const mapped = data.map(({ id, name, details }) => ({
        id,
        name: name.toUpperCase(),
        details,
        keywords: details.split(' ').filter(word => word.length > 3),
    }));
    const sorted = mapped.sort((a, b) => a.name.localeCompare(b.name));
    const uniqueNames = [...new Set(sorted.map(item => item.name))];
    return { sorted, uniqueNames };
};

const logResults = ({ sorted, uniqueNames }) => {
    console.group('Processed Data');
    console.table(sorted);
    print('Unique Names:', uniqueNames);
    console.groupEnd();
};

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    try {
        const data = await fetchData(url);
        const results = processData(data);
        logResults(results);
    } catch (error) {
        console.error('Error handling the data:', error);
    }
})();
