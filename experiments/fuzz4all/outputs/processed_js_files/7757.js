const fs = require('fs').promises;
const axios = require('axios');

 
(async () => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
        
         
        const transformedData = data.map(({ id, name, email }) => ({ id, name, email }));

         
        const summary = transformedData.map(user => `${user.name} can be reached at ${user.email}`);

         
        const output = `User Summary:\n${summary.join('\n')}`;

         
        await fs.writeFile('users-summary.txt', output);

         
        print('Emails:', ...transformedData.map(user => user.email));

    } catch (error) {
         
        console.error(`An error occurred: ${error?.message ?? 'Unknown error'}`);
    }
})();
