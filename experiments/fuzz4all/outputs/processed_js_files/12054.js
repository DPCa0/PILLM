const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetching user data failed:', error);
  }
};

const processUserData = ({ id, name, email, address: { city }, company: { name: companyName } }) => {
  return {
    id,
    name,
    contactInfo: `${name} <${email}>`,
    location: city,
    company: companyName,
  };
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const updateUserInterface = debounce((userData) => {
  console.log(`User Profile:
  Name: ${userData.name}
  Email: ${userData.contactInfo}
  Location: ${userData.location}
  Company: ${userData.company}
  `);
}, 300);

const main = async (userId) => {
  const rawUserData = await fetchUserData(userId);
  if (rawUserData) {
    const userData = processUserData(rawUserData);
    updateUserInterface(userData);
  }
};

 
main(1);
