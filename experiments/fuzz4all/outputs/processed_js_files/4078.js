 
(async () => {
   
  const fetchUserData = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data.results[0];
  };

   
  function* userPropertyGenerator(user) {
    yield* Object.entries(user).map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
  }

   
  const observeUserChanges = (user) => {
    return new Proxy(user, {
      set(target, prop, value) {
        print(`Property ${prop} changed from ${target[prop]} to ${value}`);
        target[prop] = value;
        return true;
      }
    });
  };

   
  try {
    const user = await fetchUserData();
    print('Original User Data:', user);
    
     
    const observedUser = observeUserChanges(user);

     
    observedUser.email = 'newemail@example.com';

     
    const userGen = userPropertyGenerator(observedUser);
    for (const property of userGen) {
      print(property);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
