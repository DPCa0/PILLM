 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new CustomError('Failed to fetch data');
  }
  return response.json();
};

 
const mergeAndFilter = (filterFn, ...arrays) => {
  const merged = arrays.flat();
  return merged.filter(filterFn);
};

 
const validator = {
  set: function (obj, prop, value) {
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new CustomError('Age must be a positive number');
    }
    obj[prop] = value;
    return true;
  }
};

const person = new Proxy({}, validator);

try {
   
  (async () => {
    const dataUrl = 'https://jsonplaceholder.typicode.com/users';
    const users = await fetchData(dataUrl);

     
    const [firstUser] = users;
    const { name, email } = firstUser;
    print(`Fetched user: ${name} with email: ${email}`);

     
    print(`Company name: ${firstUser?.company?.name ?? 'Unknown'}`);

     
    const ages = [25, 30, 35];
    const filteredAges = mergeAndFilter(age => age >= 30, ages);
    print('Filtered ages:', filteredAges);

     
    person.name = 'Alice';
    person.age = 30;
    print('Validated person object:', person);

  })();

} catch (error) {
  if (error instanceof CustomError) {
    console.error('Custom Error:', error.message);
  } else {
    console.error('Unexpected Error:', error);
  }
}
