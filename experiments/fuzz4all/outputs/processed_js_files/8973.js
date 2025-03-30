 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return process(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
const process = async (data) => {
    await delay(1000);   
    return data.map(item => {
        const { id, name, ...otherProps } = item;
        return { id, name: name.toUpperCase(), ...otherProps };
    });
};

 
const data = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 }
];

 
global.fetch = (url) => Promise.resolve({
    json: () => Promise.resolve(data)
});

 
(async () => {
    const processedData = await fetchData('https://api.example.com/data');
    console.table(processedData);
})();
