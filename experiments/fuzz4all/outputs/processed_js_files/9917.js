 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
}

 
async function processData() {
    try {
        const response = await fetchData("https://api.example.com/data");
        const doubledData = response.data.map(num => num * 2);
        
         
        const [first, second, ...rest] = doubledData;
        
        print(`First: ${first}, Second: ${second}, Rest: ${rest.join(", ")}`);
        
         
        const uniqueData = [...new Set(doubledData)];
        
         
        const result = uniqueData?.[0] ?? "No Data";
        print(`Unique First Element: ${result}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

 
(async () => {
    await processData();
})();
