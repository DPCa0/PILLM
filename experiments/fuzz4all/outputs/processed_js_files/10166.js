 
const fetchData = async ({ url, retries = 3, delay = 1000 } = {}) => {
    if (!url) throw new Error("URL is required");

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
             
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

             
            const data = await response.json();
            return data?.result ?? "No result found";

        } catch (error) {
            console.error(`Attempt ${attempt}: ${error.message}`);
            if (attempt < retries) {
                 
                await new Promise(res => setTimeout(res, delay));
            } else {
                throw new Error("Max retries reached");
            }
        }
    }
};

 
(async () => {
    try {
        const config = {
            url: 'https://api.example.com/data',
            retries: 5,
            delay: 2000
        };
        const result = await fetchData(config);
        print("Data fetched successfully:", result);

         
        const uniqueValues = new Set(result.items.map(item => item.id));
        print("Unique Item IDs:", [...uniqueValues]);

         
        const detailedItems = await Promise.all(
            result.items.map(async (item) => {
                const details = await fetchData({ url: item.detailsUrl });
                return { ...item, details };
            })
        );
        print("Detailed Items:", detailedItems);

    } catch (error) {
        console.error("Failed to fetch data:", error.message);
    }
})();
