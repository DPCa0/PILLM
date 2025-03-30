 

 
const logger = {
  get: (target, property) => {
    print(`Property '${property}' was accessed.`);
    return target[property];
  },
};

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

 
function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data && data.length > 0) {
        resolve(data.map((item) => item.title).slice(0, 5));
      } else {
        reject("No data to process");
      }
    }, 1000);
  });
}

 
(async function () {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const proxyUrl = new Proxy({ url }, logger);

  try {
    const data = await fetchData(proxyUrl.url);
    const titles = await processData(data);

    titles.forEach((title, index) => {
      print(`Title ${index + 1}: ${title}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
