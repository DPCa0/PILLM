 
const fs = require('fs');
const path = require('path');

 
(async function complexJSProgram() {
  try {
     
    const { dir = __dirname } = {};

     
    const files = await fs.promises.readdir(dir);

     
    const extensions = new Set();

     
    for (const file of files) {
      const ext = path.extname(file);
      if (ext) {
        extensions.add(ext);
      }

       
      const fileStat = await fs.promises.stat(path.join(dir, file));
      const fileType = fileStat.isDirectory() ? 'Directory' : 'File';

      print(`${file} is a ${fileType}`);
    }

     
    print(`Unique file extensions in directory: ${[...extensions].join(', ')}`);

     
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
