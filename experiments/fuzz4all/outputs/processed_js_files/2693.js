 
import fs from 'fs';
import path from 'path';

 
async function readJsonFile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

 
async function processJsonData(filePath) {
    const data = await readJsonFile(filePath);
    const names = new Set(data.map(({ name }) => name));
    const uniqueNames = [...names];
    return uniqueNames;
}

 
const logUniqueNames = async (filePath) => {
    try {
        const names = await processJsonData(filePath);
        names.forEach((name, index) => {
            print(`Name ${index + 1}: ${name ?? 'N/A'}`);
        });
    } catch (error) {
        console.error('Error processing names:', error.message);
    }
};

 
const sampleData = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Alice', age: 28 }
];

const sampleFilePath = path.join(process.cwd(), 'sampleData.json');
fs.promises.writeFile(sampleFilePath, JSON.stringify(sampleData, null, 2))
    .then(() => logUniqueNames(sampleFilePath))
    .catch(err => console.error('Error writing sample data:', err));
