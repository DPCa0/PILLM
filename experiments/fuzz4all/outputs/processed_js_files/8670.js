 
const fs = require('fs');
const crypto = require('crypto');

 
const readFileAsync = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

 
const hashData = async (data) => {
    try {
         
        const hash = crypto.createHash('sha256');
         
        hash.update(data);
         
        return hash.digest('hex');
    } catch (error) {
        console.error('Error hashing data:', error);
    }
};

 
(async () => {
    try {
         
        const data = await readFileAsync('sample.txt');
         
        const hashedData = await hashData(data);
         
        print(`Hashed data: ${hashedData}`);
    } catch (error) {
        console.error('Error:', error);
    }
})();

 
const fruits = ['Apple', 'Banana', 'Cherry'];
const [firstFruit, secondFruit, thirdFruit] = fruits;
print(`Fruits: ${firstFruit}, ${secondFruit}, ${thirdFruit}`);

 
const moreFruits = ['Dragonfruit', 'Elderberry'];
const allFruits = [...fruits, ...moreFruits];
print('All Fruits:', allFruits);

 
const uniqueFruits = new Set(allFruits);
print('Unique Fruits:', [...uniqueFruits]);

const fruitMap = new Map();
allFruits.forEach((fruit, index) => {
    fruitMap.set(index, fruit);
});
print('Fruit Map:', fruitMap);

 
const getFruitByIndex = (index) => fruitMap.get(index) ?? 'Unknown Fruit';
print('Fruit at index 10:', getFruitByIndex(10));
