 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: `Data from ${url}` });
            } else {
                reject('URL not provided');
            }
        }, 1000);
    });
};

 
const fetchMultipleData = async (...urls) => {
    try {
         
        const results = await Promise.all(urls.map(fetchData));
        
         
        const data = results.map(({ data }) => data);
        
         
        print(`Fetched Data: \n${data.join('\n')}`);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

 
const url1 = 'https://api.example.com/resource1';
const url2 = 'https://api.example.com/resource2';
const url3 = 'https://api.example.com/resource3';

 
fetchMultipleData(url1, url2, url3);
