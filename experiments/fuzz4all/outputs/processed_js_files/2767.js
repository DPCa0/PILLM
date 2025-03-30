 

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

function processItems([first, second, ...rest]) {
  print(`First item: ${first}`);
  print(`Second item: ${second}`);
  print(`Remaining items: ${rest}`);
}

(async function main() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(url);

    const [firstPost, secondPost, ...otherPosts] = data;

    print(`First Post Title: ${firstPost.title}`);
    print(`Second Post Title: ${secondPost.title}`);
    print(`Other Posts Count: ${otherPosts.length}`);

    processItems(['apple', 'banana', 'cherry', 'date']);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
