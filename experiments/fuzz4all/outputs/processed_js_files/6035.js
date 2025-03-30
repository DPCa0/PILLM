 
(async () => {
  const fsPromises = await import('fs/promises');

   
  async function complexFileOperation() {
    try {
       
      const writeOperations = [1, 2, 3].map(i => 
        fsPromises.writeFile(`file${i}.txt`, `Hello from file ${i}`, 'utf8')
      );

       
      await Promise.all(writeOperations);

       
      const [file1Content, file2Content, file3Content] = await Promise.all(
        [1, 2, 3].map(i => fsPromises.readFile(`file${i}.txt`, 'utf8'))
      );

       
      const uniqueWords = new Set([...file1Content.split(' '), ...file2Content.split(' '), ...file3Content.split(' ')]);
      
       
      print([...uniqueWords]?.join(', ') ?? 'No words found');

       
      function* wordGenerator(words) {
        for (const word of words) {
          yield word;
        }
      }

       
      print([...wordGenerator(uniqueWords)]);
    } catch (error) {
      console.error('Error during file operations:', error);
    }
  }

  complexFileOperation();
})();
