 
(async () => {
  const fs = await import('fs/promises');
  const { promisify } = await import('util');

   
  try {
    const fileName = 'example.txt';
    
     
    await fs.writeFile(fileName, 'Hello, world!', 'utf8');
    print(`Successfully wrote to ${fileName}`);

     
    const data = await fs.readFile(fileName, 'utf8');
    print(`File contents: ${data}`);

     
    const fancyGreeting = (strings, name) => {
      return `${strings[0]}🌟 ${name.toUpperCase()} 🌟${strings[1]}`;
    };

    const greeting = fancyGreeting`Welcome, ${data.trim()}!`;
    print(greeting);

     
    const unlinkAsync = promisify(fs.unlink);
    await unlinkAsync(fileName);
    print(`Cleaned up: Deleted ${fileName}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
