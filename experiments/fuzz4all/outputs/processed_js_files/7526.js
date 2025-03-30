const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
};

const processData = ({ results }) => {
    const filtered = results.filter(person => person.age > 30);
    return filtered.map(({ name, age }) => ({ name, age }));
};

const compose =
    (...functions) =>
    (data) =>
        functions.reduce((value, func) => func(value), data);

const logData = (data) => {
    print('Processed Data:', JSON.stringify(data, null, 2));
    return data;
};

(async () => {
    const url = 'https://randomuser.me/api/?results=10&inc=name,age';
    
    try {
        const processAndLog = compose(processData, logData);
        const data = await fetchData(url);
        processAndLog(data);
    } catch (error) {
        console.error('Error:', error);
    }
})();
