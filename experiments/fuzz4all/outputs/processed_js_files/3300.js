 

const fetchData = async (url) => {
    try {
         
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
         
        const { results } = await response.json();
        return results;
    } catch (error) {
        console.error('Fetch Error:', error);
        return [];
    }
};

const processResults = (data) => {
     
    return data
        .filter(({ status }) => status === 'active')   
        .map(({ name, email }) => ({ name, email }))   
        .reduce((acc, user) => ({ ...acc, [user.email]: user }), {});  
};

const displayResults = (processedData) => {
     
    console.log('Active Users:\n' + Object.entries(processedData)
        .map(([email, { name }]) => `Name: ${name}, Email: ${email}`)
        .join('\n'));
};

const main = async () => {
    const data = await fetchData('https://api.example.com/users');
    const processedData = processResults(data);
    displayResults(processedData);
};

main();
