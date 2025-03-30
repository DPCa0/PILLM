 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
     
    await delay(1000);
    if (url === 'https://api.example.com/data') {
        return { success: true, data: { id: 1, name: 'Test' } };
    } else {
        throw new Error('Invalid URL');
    }
};

const handleData = async (url) => {
    try {
        const response = await fetchData(url);
        print('Fetched Data:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

const urlProxyHandler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        } else {
            return target.default;
        }
    }
};

const urls = new Proxy({
    valid: 'https://api.example.com/data',
    default: 'Invalid URL'
}, urlProxyHandler);

const main = async () => {
    await handleData(urls.valid);  
    await handleData(urls.invalid);  
};

main();
