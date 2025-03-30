 
import { readFile } from 'fs/promises';
import { resolve } from 'path';

 
const reverseFileContent = async (filePath) => {
  try {
    const content = await readFile(resolve(filePath), 'utf-8');
    return [...content].reverse().join('');
  } catch (error) {
    throw new Error('Error reading file: ' + error.message);
  }
};

 
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    success ? resolve('Data fetched successfully') : reject('Fetching failed');
  }, 2000);
});

 
function* apiCaller() {
  try {
    const response = yield fetchData;
    print(response);
  } catch (error) {
    console.error(error);
  }
}

 
const executeApiCalls = async (genFunc) => {
  const iterator = genFunc();

  const handle = (result) => {
    if (result.done) return;
    result.value.then(
      (res) => handle(iterator.next(res)),
      (err) => iterator.throw(err)
    );
  };

  handle(iterator.next());
};

 
const main = async () => {
  try {
    const filePaths = ['file1.txt', 'file2.txt'];
    const reversedContents = await Promise.all(filePaths.map(reverseFileContent));
    print('Reversed file contents:', ...reversedContents);

    executeApiCalls(apiCaller);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

 
main();
