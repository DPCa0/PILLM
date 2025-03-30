 

 
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https: 
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

 
const parseUserData = ({ name, email, address: { city, zipcode } }) => {
  return `User ${name} lives in ${city} with the zip code ${zipcode}, and can be contacted at ${email}.`;
};

 
const userHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Property accessed: ${prop}`);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist.`);
    }
  },
};

(async function run() {
  const userId = 1;
  const userData = await fetchUserData(userId);

   
  const proxiedUser = new Proxy(userData, userHandler);

   
  try {
    const message = parseUserData(proxiedUser);
    print(message);

     
    print(proxiedUser.nonExistentProp);
  } catch (error) {
    console.error(error.message);
  }
})();
