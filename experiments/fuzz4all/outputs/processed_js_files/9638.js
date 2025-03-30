 
const fs = require('fs');
const path = require('path');

 
async function complexFileOperation() {
  try {
     
    const files = await fs.promises.readdir(__dirname);

     
    const fileStatsPromises = files.map(async (file) => {
      const filePath = path.join(__dirname, file);
      const stats = await fs.promises.stat(filePath);
      return { file, size: stats.size, isFile: stats.isFile() };
    });

     
    const fileStats = await Promise.all(fileStatsPromises);

     
    const largeFiles = fileStats
      .filter(({ size, isFile }) => isFile && size > 1000)
      .map(({ file }) => file);

     
    print('Large files:', largeFiles);
    
     
    const extensions = new Set(
      files.map(file => path.extname(file).toLowerCase())
    );

    print('Unique file extensions:', [...extensions]);
  } catch (error) {
    console.error('Error reading files:', error);
  }
}

 
(async () => {
  await complexFileOperation();
})();
