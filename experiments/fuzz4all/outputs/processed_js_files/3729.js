 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: {
                    id: 1,
                    name: 'Alice',
                    details: {
                        age: 25,
                        country: 'Wonderland'
                    }
                },
                hobbies: ['reading', 'chess', 'traveling']
            });
        }, 1000);
    });
};

 
const displayUserInfo = async () => {
    try {
        const { user: { name, details: { age, country } }, hobbies } = await fetchData();
        const additionalHobbies = ['coding', 'hiking'];
        
         
        const allHobbies = [...hobbies, ...additionalHobbies];
        
         
        print(`User: ${name}, Age: ${age}, Country: ${country}`);
        print(`Hobbies: ${allHobbies.join(', ')}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
displayUserInfo();
