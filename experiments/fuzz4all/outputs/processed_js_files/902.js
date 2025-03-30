 
const fs = require('fs').promises;

 
(async function advancedJSFeatures() {
    try {
         
        const [data1, data2] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()),
            fetch('https://jsonplaceholder.typicode.com/posts/2').then(res => res.json())
        ]);

         
        const combinedData = [data1, data2].map(({ userId, title }) => ({ userId, title }));

         
        function tag(strings, ...values) {
            return strings.reduce((result, str, i) => `${result}${str}<em>${values[i] || ''}</em>`, '');
        }
        const message = tag`Fetched Posts: ${combinedData.map(d => d.title).join(', ')}`;

         
        await fs.writeFile('output.txt', `${message}\nData: ${JSON.stringify(combinedData, null, 2)}`);

         
        const uniqueKey = Symbol('uniqueKey');
        const complexObject = {
            [uniqueKey]: 'This is a unique value'
        };

        print(`File written successfully. Unique key value: ${complexObject[uniqueKey]}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
