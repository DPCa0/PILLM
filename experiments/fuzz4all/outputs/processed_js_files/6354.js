 
import fs from 'fs/promises';

 
const fetchData = async () => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Hello, Advanced JavaScript!' });
        }, 1000);
    });
};

 
(async () => {
    try {
         
        const response = await fetchData();
        const { data } = response;

         
        const formatMessage = (strings, message) => {
            return `${strings[0]}${message}`;
        };

        const message = formatMessage`Response: ${data}`;
        print(message);

         
        const details = { id: 1, name: 'John Doe', age: 30 };
        const { name, ...rest } = details;
        const updatedDetails = { ...rest, age: 31 };

        print(updatedDetails);

         
        const user = { profile: { username: 'johndoe' } };
        const username = user.profile?.username ?? 'Anonymous';

        print(`Username: ${username}`);

         
        const uniqueNumbers = new Set([1, 2, 3, 3, 2]);
        print(uniqueNumbers);  

        const nameMap = new Map();
        nameMap.set('firstName', 'Jane');
        nameMap.set('lastName', 'Doe');
        print(nameMap.get('firstName'));

         
        await fs.writeFile('output.txt', message);
        const fileContent = await fs.readFile('output.txt', 'utf-8');
        print(`File content: ${fileContent}`);

    } catch (error) {
        console.error('Error:', error);
    }
})();
