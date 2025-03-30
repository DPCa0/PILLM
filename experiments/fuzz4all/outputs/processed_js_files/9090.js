 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: "Fetched data from " + url });
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
};

 
const processData = async (...urls) => {
    try {
        const results = await Promise.all(urls.map(url => fetchData(url)));
        const processedData = results.map(({ data }) => data.toUpperCase());
        
         
        const summary = processedData.map((data, index) => ({
            index,
            length: data.length,
            snippet: data.substring(0, 10)
        }));
        
         
        const output = summary.map(({ index, length, snippet }) => myTag`
            URL Index: ${index}
            Data Length: ${length}
            Snippet: ${snippet}
        `).join('\n');
        
        print(output);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

 
function myTag(strings, ...values) {
    return strings.reduce((prev, curr, i) => prev + curr + (values[i] || ''), '');
}

 
processData('http://example.com', 'http://another-example.com', 'http://yet-another.com');
