 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.2) {  
            resolve(`Data from ${url}`);
        } else {
            reject('Network Error');
        }
    }, 1000);
});

 
const loadData = async (urls) => {
    try {
         
        const results = await Promise.all(urls.map(url => fetchData(url)));
        return results.map(data => data.toUpperCase());
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error}`);
    }
};

 
(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
    
    try {
        const data = await loadData(urls);
         
        const [first, ...rest] = data;
        print('First Response:', first);
        print('Other Responses:', rest);

         
        const uniqueData = new Set(data);
        print('Unique Responses:', [...uniqueData]);

    } catch (error) {
        console.error(error.message);
    }
})();
