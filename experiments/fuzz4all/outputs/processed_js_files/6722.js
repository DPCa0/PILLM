const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

const processData = (data) => {
    return data.map(item => ({
        ...item,
        fullName: `${item.firstName} ${item.lastName}`,
        isActive: item.status === 'active'
    }));
};

const main = async () => {
    try {
        const url = 'https://api.example.com/users';
        const rawData = await fetchData(url);

        const results = processData(rawData);
        
        const activeUsers = results.filter(user => user.isActive);
        const names = activeUsers.map(user => user.fullName);

        const sortedNames = names.sort((a, b) => a.localeCompare(b));

        sortedNames.forEach((name, index) => {
            print(`${index + 1}: ${name}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

 
(() => {
    main();
})();
