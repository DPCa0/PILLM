 
const fetchData = async () => {
  const simulateAPI = () => new Promise((resolve) => {
    setTimeout(() => resolve({ user: { name: 'Alice', age: 25 }, hobbies: ['Reading', 'Hiking'] }), 1000);
  });

  try {
    const data = await simulateAPI();
    const { user: { name, age }, hobbies } = data;

    const additionalInfo = { ...data.user, location: 'Wonderland', occupation: 'Explorer' };
    const allHobbies = [...hobbies, 'Cycling', 'Photography'];

    const displayData = (person, ...hobbies) => {
      print(`Name: ${person.name}, Age: ${person.age}, Location: ${person.location}, Occupation: ${person.occupation}`);
      print(`Hobbies: ${hobbies.join(', ')}`);
    };

    displayData(additionalInfo, ...allHobbies);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
