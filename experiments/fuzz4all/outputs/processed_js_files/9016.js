const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
};

const transformData = (data) => {
    return data
        .map(({ id, name }) => ({ id, name: name.toUpperCase() }))
        .filter(({ id }) => id % 2 === 0);
};

const processData = (data) => {
    return data.reduce((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
    }, {});
};

const main = async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');
    if (data) {
        const transformed = transformData(data);
        const result = processData(transformed);
        print(result);
    }
};

main();
