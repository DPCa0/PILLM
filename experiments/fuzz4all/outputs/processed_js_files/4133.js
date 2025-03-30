 

 
const apiURL = 'https://randomuser.me/api/';

 
const fetchData = async () => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.results[0];  
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

 
const processData = ({ name: { first, last }, location: { city, country }, email }) => {
  return {
    fullName: `${first} ${last}`,
    address: `${city}, ${country}`,
    contactEmail: email
  };
};

 
const printUserInfo = (user) => {
  const { fullName, address, contactEmail } = user;
  print(`Name: ${fullName}\nAddress: ${address}\nEmail: ${contactEmail}`);
};

 
const main = async () => {
  const rawData = await fetchData();
  if (rawData) {
    const userInfo = processData(rawData);
    printUserInfo(userInfo);
  }
};

main();
