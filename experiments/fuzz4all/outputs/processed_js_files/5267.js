 

 
import { Observable, of, from, interval } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {   
                resolve(`Data from ${url}`);
            } else {
                reject(`Error fetching data from ${url}`);
            }
        }, 1000);
    });
};

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
const urlObservable = from(urls);

 
const fetchObservableData = (url) => {
    return from(fetchData(url)).pipe(
        map(response => `Processed: ${response}`),
        catchError(error => of(`Caught: ${error}`))
    );
};

 
const trigger = interval(2000).pipe(take(urls.length));  

 
trigger.subscribe(
    () => {
        urlObservable.pipe(
            mergeMap(url => fetchObservableData(url))
        ).subscribe(
            data => console.log(data),
            err => console.error(err),
            () => console.log('Completed all fetch operations.')
        );
    },
    error => console.error('Interval Error: ', error),
    () => console.log('All intervals processed.')
);
