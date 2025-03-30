 
import fs from 'fs/promises';

 
(async () => {
    try {
         
        const complexObject = {
            id: 1,
            name: 'Advanced JS',
            details: {
                created: new Date(),
                contributors: new Map([
                    ['Alice', { commits: 120, role: 'Lead Developer' }],
                    ['Bob', { commits: 87, role: 'Tester' }]
                ])
            }
        };

         
        await fs.writeFile('complexObject.json', JSON.stringify(complexObject, null, 2));

         
        const data = await fs.readFile('complexObject.json', 'utf8');
        
         
        const parsedObject = JSON.parse(data);

         
        for (const [name, details] of parsedObject.details.contributors.entries()) {
            print(`${name} has made ${details.commits} commits as a ${details.role}.`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
