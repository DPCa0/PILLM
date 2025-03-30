 
const fs = require('fs').promises;

 
(async () => {
    try {
         
        const { username = 'Guest', email = 'guest@example.com' } = JSON.parse(await fs.readFile('user.json', 'utf8'));

         
        function highlight(strings, ...values) {
            return strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
        }
        print(highlight`Welcome ${username}! Your email is ${email}.`);

         
        const numbers = [1, 2, 3, 4, 5];
        const squaredNumbers = numbers.map(num => num ** 2);
        print(`Squared Numbers: ${squaredNumbers.join(', ')}`);

         
        const uniqueNumbers = [...new Set([2, 3, 3, 4, 4, 5, 6])];
        print(`Unique Numbers: ${uniqueNumbers.join(', ')}`);

         
        async function* asyncGenerator(arr) {
            for (let item of arr) {
                await new Promise(resolve => setTimeout(resolve, 100));
                yield item;
            }
        }

        for await (const num of asyncGenerator(numbers)) {
            print(`Async Number: ${num}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
