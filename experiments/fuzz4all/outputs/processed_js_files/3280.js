 
async function fetchAndProcessData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const { name, age, ...rest } = data;  
        const enhancedData = { ...rest, age: age + 1 };  

        const transformData = (data) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    data.transformed = true;
                    resolve(data);
                }, 1000);
            });
        };

        const finalData = await transformData(enhancedData);
        print(`Processed data for: ${name}`, finalData);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

 
fetchAndProcessData('https://api.example.com/data');
