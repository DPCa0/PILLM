 
async function complexJSProgram() {
  const apiURL = 'https://jsonplaceholder.typicode.com/posts';

   
  try {
    let response = await fetch(apiURL);
    if (!response.ok) throw new Error('Network response was not ok');

     
    let data = await response.json();
    let transformedData = data.map(({ id, title }) => ({ id, title }));

     
    let uniqueLengths = new Set(transformedData.map(({ title }) => title.length));

     
    let processedDataPromises = transformedData.map(({ id, title }) => 
      new Promise((resolve) => {
        setTimeout(() => resolve({ id, title, titleLength: title.length }), id * 10);
      })
    );

    let processedData = await Promise.all(processedDataPromises);

     
    let [firstPost, ...otherPosts] = processedData;

    print('First processed post:', firstPost);
    print('Other processed posts:', otherPosts);
    print('Unique title lengths:', [...uniqueLengths]);
    
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

complexJSProgram();
