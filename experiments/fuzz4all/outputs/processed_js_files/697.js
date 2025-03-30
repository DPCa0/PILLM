const { from, interval, zip } = require('rxjs');
const { map, filter, mergeMap, take } = require('rxjs/operators');

 
const fetchData = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));  
  return { id, value: Math.floor(Math.random() * 100) };
};

 
const numbers$ = from([1, 2, 3, 4, 5]);

 
const interval$ = interval(100).pipe(take(5));

 
zip(numbers$, interval$).pipe(
  map(([id]) => id),  
  filter(id => id % 2 === 0),  
  mergeMap(async id => await fetchData(id)),  
  map(data => ({ ...data, timestamp: new Date().toISOString() }))  
).subscribe({
  next: data => console.log(`Fetched data:`, data),
  complete: () => console.log('All data fetched.')
});
