const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        throw error;
    }
};

const processData = (data) => {
    return data.map(({ id, name, email }) => ({
        id,
        name: name.toUpperCase(),
        isGmailUser: email.includes('gmail.com'),
    }));
};

const main = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    
     
    try {
        const data = await fetchData(url);
        const processedData = processData(data);
        
         
        const [firstUser, ...otherUsers] = processedData;
        print('First User:', firstUser);
        print('Other Users:', otherUsers);
        
         
        const emailSet = new Set(data.map(user => user.email.split('@')[1]));
        const domainMap = new Map();
        
        emailSet.forEach(domain => {
            domainMap.set(domain, processedData.filter(user => user.email.includes(domain)));
        });
        
         
        print('Domains with users:', [...domainMap.entries()]);
        
    } catch (error) {
        console.error('Error in main function:', error);
    }
};

 
(() => {
    main();
})();
