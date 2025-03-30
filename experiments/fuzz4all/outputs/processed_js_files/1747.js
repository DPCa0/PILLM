 
const fetchData = async () => {
  const mockFetch = (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          json: () =>
            Promise.resolve({
              data: [
                { id: 1, value: 'Apple' },
                { id: 2, value: 'Banana' },
                { id: 3, value: 'Apple' }
              ],
            }),
        });
      }, 1000);
    });
  };

  try {
    const response = await mockFetch('https://api.example.com/fruit');
    const { data } = await response.json();

    const uniqueFruits = [...new Set(data.map(({ value }) => value))];
    const fruitObject = uniqueFruits.reduce((acc, fruit, index) => {
      acc[fruit] = index + 1;
      return acc;
    }, {});

    print('Unique Fruits:', uniqueFruits);
    print('Fruit Object:', fruitObject);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
