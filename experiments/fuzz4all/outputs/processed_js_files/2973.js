(async () => {
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    };

    const processData = ({ name, height, mass, films }) => {
        print(`Character: ${name}`);
        print(`Height: ${height}cm`);
        print(`Mass: ${mass}kg`);
        return films;
    };

    const getFilmTitles = async (filmUrls) => {
        const filmPromises = filmUrls.map(async (filmUrl) => {
            const filmData = await fetchData(filmUrl);
            return filmData.title;
        });
        return Promise.all(filmPromises);
    };

    try {
        const characterData = await fetchData('https://swapi.dev/api/people/1/');
        const filmUrls = processData(characterData);
        const filmTitles = await getFilmTitles(filmUrls);

        print('Films:');
        for (const title of filmTitles) {
            print(`- ${title}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
