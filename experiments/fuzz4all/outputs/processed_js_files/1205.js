 
const fs = require('fs');
const crypto = require('crypto');

 
(async () => {
  try {
     
    const [file1, file2] = await Promise.all([
      fs.promises.readFile('./file1.txt', 'utf8'),
      fs.promises.readFile('./file2.txt', 'utf8'),
    ]);

     
    const sensitiveData = new WeakMap();
    const dataObject = { file1Data: file1, file2Data: file2 };
    sensitiveData.set(dataObject, 'Sensitive');

     
    const { file1Data, file2Data } = dataObject;
    print(`File 1 Data: ${file1Data}`);
    print(`File 2 Data: ${file2Data}`);

     
    (function () {
      const buffer = Buffer.from(file1Data + file2Data);
      const hash = crypto.createHash('sha256').update(buffer).digest('hex');
      print(`SHA256 Hash: ${hash}`);
    })();

     
    const combinedData = [...file1Data.split('\n'), ...file2Data.split('\n')];
    const uniqueLines = [...new Set(combinedData)];

     
    const dataProxy = new Proxy(uniqueLines, {
      get(target, prop) {
        if (prop === 'length') {
          print('Intercepting the length property access!');
        }
        return target[prop];
      },
    });

    print(`Unique Lines Count: ${dataProxy.length}`);
  } catch (err) {
    console.error('Error:', err);
  }
})();
