 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
};

 
function* processData(data) {
  for (const item of data) {
    yield {
      ...item,
      fullName: `${item.name.first} ${item.name.last}`,
    };
  }
}

 
const userValidationHandler = {
  set: (obj, prop, value) => {
    if (prop === 'age' && (value < 0 || value > 120)) {
      throw new Error('Invalid age');
    }
    obj[prop] = value;
    return true;
  }
};

 
const user = new Proxy({}, userValidationHandler);

 
(async () => {
  const apiURL = 'https://randomuser.me/api/?results=5';
  const rawData = await fetchData(apiURL);
  
  if (rawData && rawData.results) {
     
    const userGenerator = processData(rawData.results);
    let nextUser;
    while (!(nextUser = userGenerator.next()).done) {
      const { fullName, age } = nextUser.value;
      print(`Processed User: ${fullName}`);

       
      try {
        user.age = age;
        print(`Age set successfully: ${user.age}`);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
})();
