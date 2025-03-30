 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const processData = async () => {
  try {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(apiURL);
    
    const [firstPost, secondPost] = data;
    const { title: firstTitle, body: firstBody } = firstPost;
    const { title: secondTitle, body: secondBody } = secondPost;
    
    const uniqueId = Symbol('uniqueId');

    const formatPost = ({ title, body }) => {
      return `Title: ${title}\nBody: ${body}\n`;
    };

    print(`Symbol ID: ${uniqueId.toString()}`);
    print(`First Post:\n${formatPost(firstPost)}`);
    print(`Second Post:\n${formatPost(secondPost)}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

processData();
