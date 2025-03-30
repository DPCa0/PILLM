Certainly! Here's a JavaScript program that uses advanced features like async/await, Promises, destructuring, and higher-order functions in a complex way:

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ data, transform }) => {
  return data.map(item => transform(item));
};

const transformItem = ({ id, name, price }) => {
  return { 
    id, 
    name: name.toUpperCase(), 
    price: price * 0.9 
  };
};

const displayData = (items) => {
  console.table(items);
};

(async () => {
  try {
    const dataURL = 'https: 
    const { items } = await fetchData(dataURL);
    
    const transformedItems = processData({
      data: items,
      transform: transformItem
    });

    displayData(transformedItems);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();

This program fetches data from a URL, processes it by applying a transformation to each item, and then displays the transformed data in a table. It makes use of various advanced JavaScript features for handling asynchronous operations and functional programming techniques.