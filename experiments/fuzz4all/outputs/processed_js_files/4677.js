 

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = { id: 1, name: 'Complex JS', details: { info: 'Advanced', status: 'Learning' } };
      resolve(data);
    }, 1000);
  });
};

const processData = async () => {
  try {
    const { id, name, details: { info, status } } = await getData();
    
    const upperCaseName = name.toUpperCase();
    const description = `${upperCaseName} is ${info.toLowerCase()} and you are currently ${status.toLowerCase()}.`;

    print(`Processed Data [${id}]: ${description}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

processData();
