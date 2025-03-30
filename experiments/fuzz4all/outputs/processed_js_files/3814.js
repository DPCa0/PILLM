 
async function fetchRandomUser() {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  return data.results[0];
}

 
function createUserProxy(user) {
  return new Proxy(user, {
    get(target, prop) {
      print(`Accessed property: ${prop}`);
      return prop in target ? target[prop] : 'Property not found';
    }
  });
}

 
(async () => {
  try {
    const user = await fetchRandomUser();
    const proxiedUser = createUserProxy(user);

     
    const fullName = `${proxiedUser.name?.first ?? 'FirstName'} ${proxiedUser.name?.last ?? 'LastName'}`;
    const email = proxiedUser.email ?? 'Email not available';

    print(`Name: ${fullName}`);
    print(`Email: ${email}`);

     
    const { street, city, country } = proxiedUser.location || {};
    print(`Location: ${street?.name ?? 'Unknown Street'}, ${city ?? 'Unknown City'}, ${country ?? 'Unknown Country'}`);
    
     
    function* userInfoGenerator(user) {
      yield `Name: ${user.name.first} ${user.name.last}`;
      yield `Email: ${user.email}`;
      yield `City: ${user.location.city}`;
    }

    const userGenerator = userInfoGenerator(proxiedUser);
    for (const info of userGenerator) {
      print(info);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
