 
import fs from 'fs/promises';

 
async function performFileOperations() {
    try {
         
        await fs.writeFile('sample.txt', 'Hello, world!');
        
         
        const data = await fs.readFile('sample.txt', 'utf8');
        print('File content:', data);
        
         
        const name = 'JavaScript';
        const message = highlight`Learning ${name} is fun!`;
        print(message);
        
         
        function highlight(strings, ...values) {
            return strings.reduce((prev, curr, i) => 
                `${prev}${curr}<strong>${values[i] || ''}</strong>`, '');
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

 
performFileOperations();
