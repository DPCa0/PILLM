 

class API {
    static async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
}

const processUserData = async (url) => {
    const data = await API.fetchData(url);
    if (!data) return;

    const { users } = data;
    users.forEach(user => {
        const { name, address: { city }, company: { name: companyName } } = user;
        print(`Name: ${name}, City: ${city}, Company: ${companyName}`);
    });
};

 
(async () => {
    const userDataUrl = 'https://jsonplaceholder.typicode.com/users';
    await processUserData(userDataUrl);
})();
