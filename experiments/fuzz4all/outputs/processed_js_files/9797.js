class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }
}

const fromEvent = (element, event) => {
  return new Observable((observer) => {
    const handler = (e) => observer.next(e);
    element.addEventListener(event, handler);
    return {
      unsubscribe() {
        element.removeEventListener(event, handler);
      }
    };
  });
};

const pipe = (...functions) => (input) => 
  functions.reduce((acc, fn) => fn(acc), input);

const map = (fn) => (observable) => 
  new Observable((observer) => {
    return observable.subscribe({
      next: (value) => observer.next(fn(value)),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });

const debounceTime = (ms) => (observable) => 
  new Observable((observer) => {
    let timeoutId;
    return observable.subscribe({
      next: (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => observer.next(value), ms);
      },
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });

const searchInput = document.querySelector('#search');
const resultDiv = document.querySelector('#result');

const search$ = pipe(
  debounceTime(300),
  map((event) => event.target.value)
)(fromEvent(searchInput, 'input'));

search$.subscribe({
  next: (query) => {
     
    resultDiv.textContent = `Search for: ${query}`;
  },
  error: (err) => console.error(err),
  complete: () => console.log('Completed')
});

Note: This program demonstrates advanced JavaScript concepts including custom observables, function composition using `pipe`, reactive programming with `map` and `debounceTime`, and DOM manipulation through event handling.