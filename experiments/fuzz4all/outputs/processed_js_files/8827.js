 
const pipeline = (...functions) => input =>
  functions.reduce((chain, func) => chain.then(func), Promise.resolve(input));

 
const fetchRandomUser = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  return data.results[0];
};

 
const transformUserData = user => ({
  fullName: `${user.name.first} ${user.name.last}`,
  email: user.email,
  location: `${user.location.city}, ${user.location.country}`,
});

 
const logUserData = user => {
  print(`Name: ${user.fullName}`);
  print(`Email: ${user.email}`);
  print(`Location: ${user.location}`);
  return user;
};

 
const notifyUserCreation = user =>
  new Promise(resolve => {
    setTimeout(() => {
      print(`User ${user.fullName} processed successfully!`);
      resolve(user);
    }, 1000);
  });

 
const userPipeline = pipeline(
  fetchRandomUser,
  transformUserData,
  logUserData,
  notifyUserCreation
);

 
userPipeline().catch(console.error);
