const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch error: ', error);
    }
};

const processData = ({ id, name, age, ...rest }) => ({
    id,
    name: name.toUpperCase(),
    age: age || 'Not specified',
    details: rest
});

const printProcessedData = ({ id, name, age, details }) => {
    print(`ID: ${id}, Name: ${name}, Age: ${age}`);
    print('Other Details:', details);
};

(async () => {
    const apiData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    if (!apiData) return;

    const { id, name, username, email, address, ...extraData } = apiData;
    const restData = { username, email, address, ...extraData };
    
    const processedData = processData({ id, name, age: apiData.age, ...restData });

    const newData = { ...processedData, timeStamp: new Date().toISOString() };

    printProcessedData(newData);
})();
