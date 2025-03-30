const pipeline = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const fetchData = url => fetch(url).then(res => res.json());

const filterByAge = minAge => data => data.filter(user => user.age >= minAge);

const calculateAverageAge = data => {
    const totalAge = data.reduce((sum, user) => sum + user.age, 0);
    return totalAge / data.length;
};

const formatResult = averageAge => `The average age is ${averageAge.toFixed(2)} years.`;

const logResult = result => print(result);

const url = 'https://api.example.com/users';

pipeline(
    fetchData,
    filterByAge(18),
    calculateAverageAge,
    formatResult,
    logResult
)(url);
