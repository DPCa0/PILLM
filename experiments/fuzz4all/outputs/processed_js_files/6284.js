 
async function fetchAndProcessData(urls) {
  try {
     
    const responses = await Promise.all(
      urls.map(url => fetch(url).then(res => res.json()))
    );

     
    const [first, second, ...others] = responses;
    
     
    const uniqueData = [...new Set([...(first.data || []), ...(second.data || []), ...others.flatMap(r => r.data || [])])];

     
    const importantData = uniqueData.map(item => item?.importantField ?? 'Default Value');

     
    const formattedData = importantData.map(formatData);

     
    for await (const item of formattedData) {
      print(item);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
function formatData(strings, ...values) {
  return strings.raw.map((str, i) => `${str}${values[i] ?? ''}`).join('');
}

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];

 
fetchAndProcessData(urls);
