 
import fs from 'fs/promises';

 
async function complexFeatureDemo() {
  try {
     
    const data = await fs.readFile('data.json', 'utf8');
    const parsedData = JSON.parse(data);

     
    const { name, ...rest } = parsedData;

     
    const greet = (username) => `Hello, ${username}! Welcome back!`;

     
    const set = new Set([name, ...Object.values(rest)]);
    const map = new Map();

    set.forEach((value, index) => {
      map.set(`Item${index + 1}`, value);
    });

     
    const iterableObj = {
      [Symbol.iterator]: function* () {
        yield* [...map.entries()];
      },
    };

    for (const [key, value] of iterableObj) {
      print(`${key}: ${value}`);
    }

     
    console.log(
      greet(name),
      `Your status: ${(parsedData?.status ?? 'No status available')}`
    );

  } catch (error) {
    console.error('Error reading or processing file:', error);
  }
}

 
complexFeatureDemo();

Note: Ensure you have a `data.json` file in the same directory with a valid JSON structure for this script to run correctly.