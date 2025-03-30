 

class FetchError extends Error {
    constructor(message, response) {
        super(message);
        this.name = "FetchError";
        this.response = response;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
    await delay(1000);  
    const response = await fetch(url);
    if (!response.ok) {
        throw new FetchError(`Error fetching data: ${response.statusText}`, response);
    }
    return response.json();
};

const processData = async () => {
    try {
        const data1 = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        const data2 = await fetchData('https://jsonplaceholder.typicode.com/users/1');

         
        const { title, body } = data1;
        const { name, email, ...rest } = data2;

        const combinedData = {
            ...rest,
            name,
            email,
            postTitle: title,
            postBody: body,
        };

        print(`Combined Data:\n${JSON.stringify(combinedData, null, 2)}`);
    } catch (error) {
        if (error instanceof FetchError) {
            console.error(`FetchError: ${error.message}`);
        } else {
            console.error(`Unexpected error: ${error}`);
        }
    }
};

processData();
