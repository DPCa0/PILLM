 

const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
};

const processFruits = async () => {
  try {
    const fruits = await fetchData();
    print('Fetched Fruits:', ...fruits);  

    const uniqueFruits = new Set(fruits);
    uniqueFruits.add('date');
    print('Unique Fruits:', [...uniqueFruits]);  

    const fruitDetails = [...uniqueFruits].map((fruit, index) => {
      return { id: index + 1, name: fruit };
    });

    const [firstFruit, ...restFruits] = fruitDetails;  
    print('First Fruit:', firstFruit);
    print('Rest of the Fruits:', restFruits);

     
    const fruitMap = new Map(fruitDetails.map(({ id, name }) => [id, name]));
    print('Fruit Map:', fruitMap);

  } catch (error) {
    console.error('Error processing fruits:', error);
  }
};

processFruits();
