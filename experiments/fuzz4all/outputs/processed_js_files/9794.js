 
const fs = require('fs').promises;
const crypto = require('crypto');

 
const generateRandomString = (length = 10) => {
    return crypto.randomBytes(length).toString('hex');
};

 
const modifyJsonFile = async (filePath, transformFunc) => {
    try {
         
        const data = await fs.readFile(filePath, 'utf8');
        const json = JSON.parse(data);

         
        const modifiedJson = transformFunc(json);

         
        await fs.writeFile(filePath, JSON.stringify(modifiedJson, null, 2));
        print('File successfully modified');
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

 
const addRandomToken = (json) => {
    return { ...json, token: generateRandomString(16) };
};

 
const jsonFilePath = './data.json';
modifyJsonFile(jsonFilePath, addRandomToken);

**Note:** Ensure a `data.json` file exists in the same directory for this script to execute correctly.