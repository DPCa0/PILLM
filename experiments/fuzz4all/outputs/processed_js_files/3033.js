 

async function fetchData(url) {
     
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    return { data: { users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] } };
}

async function processData() {
    const url = 'https://api.example.com/data';
    const { data: { users } } = await fetchData(url);
    
    const processedUsers = users.map(({ id, name }) => {
        const reversedName = name.split('').reverse().join('');
        return `User ID: ${id}, Name: ${reversedName}`;
    });

    return processedUsers;
}

processData()
    .then(results => console.log('Processed Users:\n', results.join('\n')))
    .catch(error => console.error('Error processing data:', error));
