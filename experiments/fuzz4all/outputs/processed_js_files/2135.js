 

 
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.5.5/rxjs.umd.min.js";
document.head.appendChild(script);

script.onload = () => {
  const { fromEvent, interval } = rxjs;
  const { map, filter, takeUntil } = rxjs.operators;

   
  const clicks$ = fromEvent(document, 'click');

   
  const ticker$ = interval(1000);

   
  const example$ = ticker$.pipe(
    map(val => val * 2),   
    filter(val => val % 3 === 0),   
    takeUntil(clicks$)   
  );

   
  example$.subscribe({
    next: val => console.log(`Emitted Value: ${val}`),
    complete: () => console.log('Completed after a click event')
  });
};
