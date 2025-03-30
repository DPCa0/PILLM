 
import fetch from 'node-fetch';

 
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https: 
    const userData = await response.json();

     
    const userName = userData?.name ?? 'Name not found';

     
    const { email = 'Email not found', address: { city = 'City not found' } = {} } = userData;

     
    const userInfo = { ...userData, timestamp: new Date().toISOString() };
    print(`User Info: ${JSON.stringify(userInfo, null, 2)}`);

     
    const hobbies = ['reading', 'coding', 'hiking'].map((hobby, index) => ({
      id: index + 1,
      name: hobby
    }));

     
    const fullProfile = { userName, email, city, hobbies };

     
    function* hobbyIterator(hobbies) {
      for (const hobby of hobbies) {
        yield hobby;
      }
    }

    const iterator = hobbyIterator(fullProfile.hobbies);
    for (let hobby of iterator) {
      print(`Hobby ID: ${hobby.id}, Hobby Name: ${hobby.name}`);
    }

    return fullProfile;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}

 
(async () => {
  const userId = 1;
  const userProfile = await fetchUserData(userId);
  print(`Complete User Profile:`, userProfile);
})();
