 
import { promises as fs } from 'fs';

 
(async function complexFeatureDemo() {
    try {
         
        const fileName = `example_${new Date().getTime()}.txt`;
        
         
        const data = {
            message: 'Hello, world!',
            timestamp: new Date().toISOString(),
            extraInfo: 'This is a complex JavaScript example.'
        };
        
         
        await fs.writeFile(fileName, JSON.stringify({ ...data, id: Math.random() }, null, 2));
        
        print(`File ${fileName} written successfully.`);
        
         
        const content = await fs.readFile(fileName, 'utf-8');
        
         
        const { message, timestamp, extraInfo, id } = JSON.parse(content);
        
        print(`Content: ${message} (ID: ${id})\nTimestamp: ${timestamp}\nInfo: ${extraInfo}`);
        
    } catch (error) {
         
        console.error('Error:', { errorMessage: error.message, stackTrace: error.stack });
    }
})();
