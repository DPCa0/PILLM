const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching error: ", error);
  }
};

const processData = (data) => {
  try {
    return data.map((item) => ({
      ...item,
      fullName: `${item.firstName} ${item.lastName}`,
      isAdult: item.age >= 18,
    }));
  } catch (error) {
    console.error("Processing error: ", error);
  }
};

const displayData = (processedData) => {
  const list = document.createElement("ul");
  processedData.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.fullName} - ${item.isAdult ? 'Adult' : 'Minor'}`;
    list.appendChild(listItem);
  });
  document.body.appendChild(list);
};

(async () => {
  const url = "https://api.example.com/users";
  const rawData = await fetchData(url);
  if (rawData) {
    const processedData = processData(rawData);
    if (processedData) displayData(processedData);
  }
})();
