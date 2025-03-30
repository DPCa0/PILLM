 

const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', role: 'Developer' },
        { id: 2, name: 'Bob', role: 'Designer' },
        { id: 3, name: 'Charlie', role: 'Manager' }
      ]);
    }, 1000);
  });

const processData = async () => {
  try {
    const data = await fetchData();
    const [first, ...others] = data;
    
    print('First:', first);

    const names = others.map(({ name }) => name);
    print('Others:', ...names);

    const transformedData = data.reduce((acc, { id, ...rest }) => {
      return { ...acc, [id]: { ...rest, active: true } };
    }, {});

    print('Transformed Data:', transformedData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

processData();
