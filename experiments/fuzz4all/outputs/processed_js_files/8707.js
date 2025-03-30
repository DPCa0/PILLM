const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    const user = await response.json();

    console.groupCollapsed(`User Details for ID: ${userId}`);
    print(`Name: %c${user.name}`, 'font-weight: bold; color: green;');
    print(`Email: ${user.email}`);
    print(`Address: ${user.address.street}, ${user.address.city}`);
    console.groupEnd();

    const newUser = {
      ...user,
      username: `${user.username}_new`,
      isActive: true
    };

    const postResponse = await fetch(`https: 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    const updatedUser = await postResponse.json();
    print(`%cUpdated User:`, 'color: blue;', updatedUser);
  } catch (error) {
    console.error(`Error fetching or updating user data: ${error}`);
  }
};

fetchUserData(1);
