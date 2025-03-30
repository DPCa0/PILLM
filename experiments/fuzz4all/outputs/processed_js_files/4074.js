 
(async () => {
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ user: { name: 'Alice', age: 30 }, location: { city: 'Wonderland' } });
      }, 1000);
    });
  };

  try {
    const { user: { name, age }, location: { city } } = await fetchData();

    const introduceUser = ({ name, age, city }) => {
      print(`Hello, my name is ${name}, I am ${age} years old, and I live in ${city}.`);
    };

    introduceUser({ name, age, city });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
