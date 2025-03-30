 

 
async function* fetchUserData(userId) {
  const response = await fetch(`https: 
  const user = await response.json();
  yield user;
}

 
const userValidationHandler = {
  set: (target, property, value) => {
    if (property === 'name' && typeof value !== 'string') {
      throw new TypeError('Name must be a string');
    }
    target[property] = value;
    return true;
  }
};

function createValidatedUser(user) {
  return new Proxy(user, userValidationHandler);
}

 
async function main() {
  const userId = 1;
  const userGenerator = fetchUserData(userId);

  for await (let userData of userGenerator) {
    print('Fetched User Data:', userData);

    const validatedUser = createValidatedUser(userData);
    try {
      validatedUser.name = 'Updated Name';  
      print('Updated User Data:', validatedUser);

      validatedUser.name = 12345;  
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  }
}

main().catch(error => console.error('Error in main function:', error.message));
