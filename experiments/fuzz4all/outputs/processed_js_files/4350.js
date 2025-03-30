const apiCall = async (endpoint) => {
     
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

const processData = (data) => {
     
    const uniqueData = new Set(data.map(item => item.value));
    return Array.from(uniqueData).map(value => ({
        value,
        isEven: value % 2 === 0
    }));
};

(async () => {
    try {
         
        const endpoint = `https: 
        const data = await apiCall(endpoint);
        
         
        const [first, ...rest] = processData(data);

        print('First processed data:', first);
        print('Rest of the data:', rest);

         
        const results = await Promise.all(
            rest.map(async ({ value }) => {
                const module = await import(`./modules/${value}.js`);
                return module.processValue(value);
            })
        );

        print('Processed results:', results);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
})();
