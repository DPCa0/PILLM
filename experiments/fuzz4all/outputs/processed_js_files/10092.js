 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
const processData = ({ title, year, ...rest }) => {
  const movieInfo = { title, year, ...rest };
  return {
    ...movieInfo,
    summary: `The movie "${title}" was released in ${year}.`
  };
};

 
const createReactiveObject = (initialData) => {
  return new Proxy(initialData, {
    get(target, prop, receiver) {
      print(`Getting property ${prop}`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      print(`Setting property ${prop} to ${value}`);
      return Reflect.set(target, prop, value, receiver);
    }
  });
};

 
(async () => {
  try {
    const url = 'https://api.sampleapis.com/movies/action-adventure';
    const movies = await fetchData(url);
    const movie = movies[0];
    const movieSummary = processData(movie);

    let reactiveMovie = createReactiveObject(movieSummary);
    print(reactiveMovie.summary);

     
    reactiveMovie.title = 'New Movie Title';
    print(reactiveMovie.summary);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
