const { fromEvent, interval } = require('rxjs');
const { map, filter, takeUntil, switchMap, take } = require('rxjs/operators');

 
const logWithPrefix = prefix => source => source.pipe(
  map(value => {
    print(`${prefix}: ${value}`);
    return value;
  })
);

 
const simulateAsyncOp = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function reactiveSequence() {
  const click$ = fromEvent(document, 'click').pipe(logWithPrefix('Click'));

  const interval$ = interval(500).pipe(
    map(n => n * 2),
    filter(n => n % 3 !== 0),
    take(10),
    logWithPrefix('Interval')
  );

  const combined$ = click$.pipe(
    switchMap(() => interval$.pipe(takeUntil(fromEvent(document, 'dblclick')))),
    logWithPrefix('Combined')
  );

  combined$.subscribe(async value => {
    await simulateAsyncOp(300);
    print(`Processed: ${value}`);
  });
}

reactiveSequence();
