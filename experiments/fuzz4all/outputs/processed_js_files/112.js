 
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
function* squaredGenerator(numbers) {
  for (const num of numbers) {
    yield num * num;
  }
}

 
const userValidator = {
  set(target, key, value) {
    if (key === 'age' && (typeof value !== 'number' || value <= 0)) {
      throw new Error('Age must be a positive number');
    }
    target[key] = value;
    return true;
  },
};

 
(async () => {
   
  const user = await fetchUserData(1);
  if (user) {
    print('Fetched User:', user);

     
    const userProxy = new Proxy(user, userValidator);

     
    try {
      userProxy.age = 30;  
      print('Updated User Age:', userProxy.age);
    } catch (error) {
      console.error('Error:', error.message);
    }

     
    const numbers = [1, 2, 3, 4];
    const squared = squaredGenerator(numbers);
    for (const value of squared) {
      print('Squared Value:', value);
    }
  }
})();
