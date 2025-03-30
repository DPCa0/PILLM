 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === "https://api.example.com/data") {
            resolve({ 
                data: [
                    { id: 1, value: 10 }, 
                    { id: 2, value: 20 },
                    { id: 3, value: 30 }
                ]
            });
        } else {
            reject("Invalid URL");
        }
    }, 1000);
});

(async () => {
    try {
         
        const { data } = await fetchData("https://api.example.com/data");
        
         
        const processedData = data
            .map(({ id, value }) => ({ id, computedValue: value * 2 }))
            .filter(item => item.computedValue > 20);

         
        const finalData = [...processedData, { id: 4, computedValue: 100 }];
        
         
        finalData.forEach(({ id, computedValue }) => 
            console.log(`ID: ${id}, Computed Value: ${computedValue}`)
        );
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();
