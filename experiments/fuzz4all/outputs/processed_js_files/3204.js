 

 
async function fetchData(url) {
    try {
         
        const response = await fetch(url);
        const data = await response.json();

         
        const { title, body } = data;

         
        return (function* () {
            yield { title, body };
        })();

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
function handleData(gen) {
    for (let value of gen) {
        print("Title:", value.title);
        print("Body:", value.body);
    }
}

 
const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts/1';

fetchData(apiEndpoint)
    .then(generator => handleData(generator))
    .catch(error => console.error("Failed to handle data:", error));
