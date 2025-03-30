 
import { readFile } from 'fs/promises';

 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

 
async function readJSONFile(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new CustomError('File not found');
    } else if (error instanceof SyntaxError) {
      throw new CustomError('Invalid JSON format');
    } else {
      throw new CustomError('Unknown error');
    }
  }
}

 
const validator = {
  set(target, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new CustomError('Age must be an integer');
      }
      if (value <= 0) {
        throw new CustomError('Age must be positive');
      }
    }
    target[prop] = value;
    return true;
  },
};

const person = new Proxy({}, validator);

try {
  person.name = 'John Doe';
  person.age = 30;  
  
   
  (function displayPerson() {
    print(`Person: ${person.name}, Age: ${person.age}`);
  })();

   
  const unknownData = null;
  const value = unknownData?.prop ?? 'Default value';
  print(value);

   
  const config = await readJSONFile('./config.json');
  print(config);

} catch (error) {
  if (error instanceof CustomError) {
    console.error(`CustomError: ${error.message}`);
  } else {
    console.error('Error:', error);
  }
}
