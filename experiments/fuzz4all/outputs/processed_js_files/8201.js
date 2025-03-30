 
import fs from 'fs/promises';

 
(async function complexJavaScriptProgram() {
  try {
     
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const { a, b, ...rest } = obj;
    print(`Destructured values: a = ${a}, b = ${b}, rest =`, rest);

     
    const message = `Advanced JS features include destructuring, async/await, promises, and more.`;
    print(message);

     
    const asyncOperation = () =>
      new Promise((resolve) => setTimeout(() => resolve("Data fetched!"), 1000));
    
    print("Fetching data...");
    const result = await asyncOperation();
    print(result);

     
    const data = { user: { name: "Jane Doe" } };
    print(`User's name: ${data.user?.name ?? "Default User"}`);

    // Dynamic import
    const { version } = await import('os');
    print(`Node.js Version (via os): ${version()}`);

    // Working with files using the fs/promises API
    const filePath = './example.txt';
    await fs.writeFile(filePath, 'Hello, world!', 'utf8');
    const fileContent = await fs.readFile(filePath, 'utf8');
    print(`Content of the file: ${fileContent}`);

     
    await fs.unlink(filePath);

  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
