 
 

async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function processUserData(data) {
     
    return data.results.map(({ name: { first, last }, email }) => ({
        fullName: `${first} ${last}`,
        email,
    }));
}

 
(async () => {
    const url = 'https://randomuser.me/api/?results=5';
    const data = await fetchData(url);

    if (data) {
         
        const processedData = processUserData(data);
        processedData.forEach(({ fullName, email }) =>
            console.log(`Name: ${fullName}, Email: ${email}`)
        );
    }
})();
