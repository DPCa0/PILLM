 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            address: {
              street: '123 Elm St',
              city: 'Metropolis',
              country: 'Utopia'
            }
          },
          stats: [100, 200, 300]
        }
      });
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const { data } = await fetchData();  
    const {
      user: {
        name,
        email,
        address: { city, country }
      },
      stats
    } = data;

    print(`Name: ${name}`);
    print(`Email: ${email}`);
    print(`Location: ${city}, ${country}`);

    const [first, ...rest] = stats;  
    print(`First stat: ${first}`);
    print(`Other stats: ${rest.join(', ')}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
processData();
