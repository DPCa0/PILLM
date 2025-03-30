 

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

function* processNumbers(numbers) {
  for (let number of numbers) {
    yield number * 2;
  }
}

async function main() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(url);
    
     
    const [firstPost, secondPost] = data;
    const { title, body } = firstPost;
    print(`Title: ${title}\nBody: ${body}`);

     
    const promises = data.map(post => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(post.title);
        }, 1000);
      });
    });

    const titles = await Promise.all(promises);
    print('Post Titles:', titles);

     
    const numbers = [1, 2, 3, 4, 5];
    const doubledNumbersGenerator = processNumbers(numbers);
    const doubledNumbers = [...doubledNumbersGenerator];
    print('Doubled Numbers:', doubledNumbers);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

main();
