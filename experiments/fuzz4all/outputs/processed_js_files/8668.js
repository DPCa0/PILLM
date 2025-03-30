 
 

const fetchUserData = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const { results: [user] } = await response.json();
    const { name: { first, last }, location: { city, country }, email } = user;

    const userDetails = `
      Name: ${first} ${last}
      Location: ${city}, ${country}
      Email: ${email}
    `;

    print(userDetails);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};

fetchUserData();
