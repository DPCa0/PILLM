 
const fetchData = async (url) => {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

 
const displayUser = ({ name, age, location: { city, country } }) => {
  print(`User ${name}, aged ${age}, lives in ${city}, ${country}.`);
};

 
const privateData = new WeakMap();

class User {
  constructor(name, age, location) {
     
    const _location = Symbol('location');
    this.name = name;
    this.age = age;
     
    privateData.set(this, { [_location]: location });
  }

  get location() {
    const _location = Object.keys(privateData.get(this))[0];
    return privateData.get(this)[_location];
  }
}

 
(async () => {
  const url = 'https://api.example.com/user';
  try {
    const userData = await fetchData(url);

     
    const user = new User(...Object.values(userData));

    displayUser(user);
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
  }
})();
