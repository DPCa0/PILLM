 
import fs from 'fs/promises';

 
async function advancedFeatureDemo() {
  try {
     
    const [file1Content, file2Content] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8')
    ]);

     
    const result = customTag`File 1 Content: ${file1Content}\nFile 2 Content: ${file2Content}`;

     
    print(result?.toUpperCase() ?? 'No content available');
  } catch (error) {
    console.error('Error reading files:', error);
  }
}

 
function customTag(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ? values[i].toUpperCase() : ''), '');
}

 
(async () => {
  await advancedFeatureDemo();
})();
