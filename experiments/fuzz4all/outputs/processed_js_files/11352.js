 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Sample Data", status: 200 });
            } else {
                reject({ error: "Not Found", status: 404 });
            }
        }, 1000);
    });
};

 
const formatData = (data) => `Fetched Data: ${data}`;

 
const processAndLogData = async (url) => {
    try {
        const response = await fetchData(url);
        if (response.status === 200) {
            const formattedData = formatData(response.data);
            print(formattedData);
        }
    } catch (error) {
        console.error(`Error: ${error.error}, Status: ${error.status}`);
    }
};

 
const settings = {
    url: "https://api.example.com/data",
    method: "GET",
};

const { url } = settings;

 
(async () => {
    await processAndLogData(url);
})();

 
const numbers = [1, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];
print(`Unique Numbers: ${uniqueNumbers}`);
