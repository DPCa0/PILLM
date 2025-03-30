 
const fs = require('fs').promises;
const path = require('path');

 
async function processFile() {
    try {
         
        const { default: jsonData } = await import('./data.json', {
            assert: { type: 'json' }
        });

         
        const [first, second, ...rest] = jsonData.items;
        const transformedData = [first, second, ...rest.map(item => ({ ...item, processed: true }))];

         
        const outputDir = jsonData.output?.directory ?? 'output';
        const outputPath = path.resolve(__dirname, outputDir);

         
        await fs.mkdir(outputPath, { recursive: true });

         
        const outputFile = path.join(outputPath, `processed_${Date.now()}.json`);

         
        await fs.writeFile(outputFile, JSON.stringify(transformedData, null, 2), 'utf8');

        print(`Data processed and saved to ${outputFile}`);

    } catch (error) {
         
        console.error(`An error occurred: ${error.message}`);
    }
}

 
processFile();

Ensure you have a `data.json` file in the same directory with an appropriate JSON structure for this script to work.