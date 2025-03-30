 

 
function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ data: `Data for ID: ${id}` });
      } else {
        reject("Invalid ID");
      }
    }, 1000);
  });
}

 
const errorHandler = {
  get(target, prop) {
    try {
      return target[prop];
    } catch (e) {
      return `Error accessing ${prop}: ${e.message}`;
    }
  }
};

 
async function getDataAndProcess(ids) {
  try {
    const results = await Promise.all(
      ids.map(async (id) => {
        const data = await fetchData(id);
        const proxyData = new Proxy(data, errorHandler);
        return proxyData.data.toUpperCase();
      })
    );
    print("Processed Results:", results);
  } catch (e) {
    console.error("Error in getDataAndProcess:", e);
  }
}

 
const ids = [1, 2, -1, 4];
getDataAndProcess([...ids, ...[5, 6]]).then(() => {
  print(`Completed processing ${ids.length + 2} items.`);
});
