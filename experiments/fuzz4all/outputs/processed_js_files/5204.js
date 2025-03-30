const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const processData = (data) => {
    return data
        .filter(item => item.active)
        .map(item => ({ ...item, fullName: `${item.firstName} ${item.lastName}` }))
        .reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
};

const main = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    
    try {
        const data = await fetchData(url);
        const processedData = processData(data);

        print('Processed Data:', processedData);

        const selectedUser = await Promise.any(
            Object.values(processedData).map(async user => {
                if (user.fullName.includes('Leanne')) return user;
                throw new Error(`User ${user.fullName} does not match`);
            })
        );
        
        print('Selected User:', selectedUser);
    } catch (error) {
        console.error('Main function error:', error);
    }
};

main();
