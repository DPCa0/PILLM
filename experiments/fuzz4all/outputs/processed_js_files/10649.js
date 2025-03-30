 
(async () => {
  const { promises: fs } = await import('fs');

   
  const getConfig = () => ({
    apiEndpoint: "https://api.example.com",
    retries: 3,
    settings: {
      theme: "dark"
    }
  });

  const config = getConfig();
  const apiEndpoint = config?.apiEndpoint ?? 'https://default.example.com';
  const theme = config?.settings?.theme ?? 'light';

  print(`API Endpoint: ${apiEndpoint}, Theme: ${theme}`);

   
  const readFiles = async (filenames) => {
    const promises = filenames.map(filename => fs.readFile(filename, 'utf-8'));
    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        print(`Content of file ${filenames[index]}: ${result.value}`);
      } else {
        console.error(`Error reading file ${filenames[index]}: ${result.reason}`);
      }
    });
  };

   
  const uniqueFiles = new Set(['file1.txt', 'file2.txt', 'file1.txt']);
  const fileContentMap = new Map();

  uniqueFiles.forEach(async (file) => {
    try {
      const content = await fs.readFile(file, 'utf-8');
      fileContentMap.set(file, content);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });

   
  fileContentMap.forEach((content, file) => {
    print(`\n--- Content of ${file} ---\n${content}`);
  });

   
  await readFiles([...uniqueFiles]);

   
  const handler = {
    get(target, prop) {
      print(`Property '${prop}' was accessed`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Setting property '${prop}' to '${value}'`);
      target[prop] = value;
      return true;
    }