 
import { readFile } from 'fs/promises';

 
async function processData() {
  try {
     
    const data = JSON.parse(await readFile('./data.json', 'utf-8'));

     
    const { users, ...rest } = data;
    const updatedUsers = users.map(({ id, ...otherProps }) => ({
      ...otherProps,
      uniqueId: `${id}-${Date.now()}`
    }));

     
    updatedUsers.forEach(user => {
      print(`Username: ${user?.name ?? 'Unknown'}, ID: ${user.uniqueId}`);
    });

     
    function* userGenerator(users) {
      for (const user of users) {
        yield user;
      }
    }

     
    const generator = userGenerator(updatedUsers);
    for (const user of generator) {
      print(`Processing user: ${user.name}`);
    }
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

 
(async () => {
  await processData();
})();
