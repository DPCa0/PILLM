 
async function fetchUserData(userId) {
    try {
         
        const response = await fetch(`https: 
        const user = await response.json();

         
        const { name, email, address: { city, street }, company: { name: companyName } } = user;

         
        print(`Name: ${name}\nEmail: ${email}\nAddress: ${street}, ${city}\nCompany: ${companyName}`);

         
        return new Promise(resolve => setTimeout(() => resolve(name), 1000));

    } catch (error) {
         
        console.error('Error fetching user data:', error);
    }
}

 
(async () => {
     
    const users = await Promise.all([fetchUserData(1), fetchUserData(2), fetchUserData(3)]);

     
    const reversedUsers = [...users].reverse();

     
    print('Reversed User Names:', reversedUsers);
})();
