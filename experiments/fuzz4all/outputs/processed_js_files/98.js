 
const { readFileSync, writeFileSync } = require('fs');
const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

 
async function encryptAndWriteToFile(inputFile, outputFile, password) {
   
  const fileContent = readFileSync(inputFile, 'utf8');

   
  const iv = randomBytes(16);

   
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(password, 'utf8').slice(0, 32), iv);

   
  let encryptedData = cipher.update(fileContent, 'utf8', 'hex');
  encryptedData += cipher.final('hex');

   
  writeFileSync(outputFile, iv.toString('hex') + ':' + encryptedData, 'utf8');
  
  print(`Data encrypted and saved to ${outputFile}`);
}

 
function* infiniteSequence(start = 0) {
  let i = start;
  while (true) {
    yield i++;
  }
}

 
const sequenceGenerator = infiniteSequence();
print(sequenceGenerator.next().value);  
print(sequenceGenerator.next().value);  

 
(async () => {
  try {
    const password = 'mysecretpassword';   
    await encryptAndWriteToFile('input.txt', 'output.enc', password);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
