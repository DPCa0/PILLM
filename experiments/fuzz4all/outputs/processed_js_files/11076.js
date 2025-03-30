 
import fs from 'fs';
import path from 'path';

 
const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

 
const handler = {
  get: function(target, prop) {
    print(`Accessing property '${prop}'`);
    return target[prop];
  },
  set: function(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

const originalObject = { name: "JavaScript", type: "Programming Language" };
const proxiedObject = new Proxy(originalObject, handler);

 
const processFile = async (fileName) => {
  try {
    const filePath = path.resolve(__dirname, fileName);
    const data = await readFileAsync(filePath);
    print("File Content:", data);
  } catch (error) {
    console.error("Error reading file:", error);
  }
};

 
const { name, type } = proxiedObject;
print(`Name: ${name}, Type: ${type}`);

 
print(`This is a demonstration of using ${name} as a ${type}.`);

 
proxiedObject.name = "Node.js";

 
(async () => {
  print("Starting the process...");
  await processFile('sample.txt');
  print("Process completed.");
})();

Note: This code requires a file named `sample.txt` in the same directory to demonstrate reading file content. It uses modern JavaScript features such as Promises, async/await, Proxy, and destructuring assignment.