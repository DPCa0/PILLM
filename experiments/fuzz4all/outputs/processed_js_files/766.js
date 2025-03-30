 

 
const API_URL = "https://jsonplaceholder.typicode.com/posts";

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Fetching data failed:", error);
  }
}

 
async function processAndLogData() {
  try {
    const data = await fetchData(API_URL);
    if (!data) return;

     
    data.slice(0, 5).forEach(({ id, title, body }) => {
      print(`Post ID: ${id}\nTitle: ${title}\nBody: ${body}\n---`);
    });

  } catch (error) {
    console.error("Processing data failed:", error);
  }
}

 
(async function main() {
  print("Starting data processing...");
  await processAndLogData();
  print("Data processing completed.");
})();
