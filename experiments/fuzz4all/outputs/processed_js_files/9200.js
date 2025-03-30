const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

const processData = (data) => {
  const filteredData = data.filter(item => item.value > 10);
  return filteredData.reduce((acc, curr) => acc + curr.value, 0);
};

class DataHandler {
  constructor(url) {
    this.url = url;
  }

  async getDataAndProcess() {
    try {
      const data = await fetchData(this.url);
      const result = processData(data);
      print(`The processed data sum is: ${result}`);
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }
}

const dataURL = 'https://api.example.com/data';
const handler = new DataHandler(dataURL);
handler.getDataAndProcess();
