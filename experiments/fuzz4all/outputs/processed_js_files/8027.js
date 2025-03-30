 

const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = {
            users: [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}],
            messages: ['Welcome', 'Hello', 'Goodbye']
        };
        url ? resolve(data) : reject('Invalid URL');
    }, 1000);
});

const processData = async (url) => {
    try {
        const { users, messages } = await fetchData(url);
        const combinedData = [...users.map(u => u.name), ...messages];
        combinedData.forEach(item => print(`Data Item: ${item}`));
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

processData('https://api.example.com/data');
