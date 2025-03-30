 

 
const fetchData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                userId: id,
                name: 'John Doe',
                hobbies: ['Reading', 'Coding', 'Hiking'],
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    zip: '12345'
                }
            };
            resolve(data);
        }, 1000);
    });
};

const processUserData = async (id) => {
    try {
         
        const userData = await fetchData(id);

         
        const { name, hobbies: [firstHobby], address: { city } } = userData;

         
        print(`Name: ${name}`);
        print(`First Hobby: ${firstHobby}`);
        print(`City: ${city}`);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

 
processUserData(1);
