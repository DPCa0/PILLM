const { from, of } = require('rxjs');
const { map, switchMap, catchError, filter } = require('rxjs/operators');

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

const processData = data => {
  return data
    .filter(item => item.active)
    .map(item => ({ ...item, processedDate: new Date() }));
};

const observable = from(fetchData('https://jsonplaceholder.typicode.com/users')).pipe(
  map(processData),
  switchMap(users => {
    const userObservables = users.map(user => of(user).pipe(
      map(user => ({
        ...user,
        isActive: user.active
      }))
    ));
    return from(Promise.all(userObservables));
  }),
  catchError(err => {
    console.error('Error occurred:', err);
    return of([]);
  })
);

observable.subscribe(
  data => console.log('Processed data:', data),
  err => console.error('Subscription error:', err),
  () => console.log('Completed')
);
