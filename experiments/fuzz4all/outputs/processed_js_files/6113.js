 
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

 
async function fetchData(query) {
  const response = await fetch(`https: 
  return await response.json();
}

 
const state = new Proxy({ query: '', result: [] }, {
  set: (target, property, value) => {
    target[property] = value;
    if (property === 'result') {
      renderResults(value);
    }
    return true;
  }
});

 
const renderResults = (results) => {
  const resultContainer = document.getElementById('results');
  resultContainer.innerHTML = results.map(item => `<div>${item.name}</div>`).join('');
};

 
const searchBox = document.getElementById('search');

fromEvent(searchBox, 'input').pipe(
  map(event => event.target.value),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => {
    state.query = query;
    return fetchData(query);
  })
).subscribe(data => {
  state.result = data.items;
});
