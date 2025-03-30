 

(async () => {
     
    const fetchData = (url) => new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { url, response: { data: "Sample Data" } };
            Math.random() > 0.1 ? resolve(data) : reject(new Error("Fetch error"));
        }, 1000);
    });

     
    const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];

    try {
        const results = await Promise.all(urls.map(url => fetchData(url)));

         
        results.forEach(({ url, response: { data } }) => {
            print(`Successfully fetched data from ${url}: ${data}`);
        });
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
})();
