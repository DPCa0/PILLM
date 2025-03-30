 
import { promises as fsPromises } from 'fs';

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
function transformData(data) {
    return data
        .filter(item => item.active)  
        .map(item => ({ ...item, score: item.value * 10 }))  
        .reduce((acc, item) => {
            acc[item.category] = acc[item.category] || [];
            acc[item.category].push(item);
            return acc;
        }, {});  
}

 
async function processData(url, outputPath) {
    try {
        const data = await fetchData(url);
        const transformedData = transformData(data);

         
        await fsPromises.writeFile(outputPath, JSON.stringify(transformedData, null, 2), 'utf8');
        print(`Data successfully written to ${outputPath}`);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
(async () => {
    const url = 'https://api.example.com/data';
    const outputPath = './output.json';
    await processData(url, outputPath);
})();
