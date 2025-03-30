(async () => {
    const fetchJSON = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    };

    const processData = (data) => {
        const processed = Object.entries(data).map(([key, value]) => ({
            [key]: Array.isArray(value) ? value.map(item => ({ ...item, processed: true })) : value
        }));
        return Object.assign({}, ...processed);
    };

    const generateRandomString = (length) => {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
    };

    const dynamicFunction = new Function('a', 'b', 'return a + b');
    
    try {
        const data = await fetchJSON('https://jsonplaceholder.typicode.com/posts');
        const processedData = processData(data);
        print('Processed Data:', processedData);

        const randomString = generateRandomString(10);
        print('Random String:', randomString);

        const sum = dynamicFunction(5, 10);
        print('Dynamic Function Result (5 + 10):', sum);
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
