 
async function advancedFeatureDemo() {
     
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

     
    const fetchUserData = async () => {
        await delay(2000);
        return { name: 'Alice', age: 30, location: { city: 'Wonderland', zip: '12345' } };
    };

     
    const userData = await fetchUserData();

     
    const { name, age, location: { city } } = userData;
    print(`User Details:\nName: ${name}\nAge: ${age}\nCity: ${city}`);

     
    const updatedUserData = { ...userData, occupation: 'Explorer' };

     
    const entries = Object.entries(updatedUserData).map(([key, value]) => `${key}: ${value}`);
    print('Updated User Data:', entries.join(', '));
}

 
advancedFeatureDemo();
