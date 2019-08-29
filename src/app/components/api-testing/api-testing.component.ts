import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Observable} from 'rxjs/Observable';
import {filter, mergeMap, map, exhaustMap} from 'rxjs/operators';

@Component({
  selector: 'app-api-testing',
  templateUrl: './api-testing.component.html',
})
export class ApiTestingComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.doAsk()
        .pipe(
            filter(res => res != null),
            map(res => {
              if (typeof res === 'string') {
                console.log(res);
                return res.toUpperCase();
              }}),
            mergeMap(ticker => this.getStockData(ticker, ticker)),
            exhaustMap(ticker => {
              return forkJoin([this.getStockData('APP.OL', ticker), this.getStockData('KVAER.OL', ticker)]);
            })
        ).subscribe({
          next: res => {
            console.log('Prosesserer og lagrer response fra første request ' + res);
          },
          error: (error) => {
            console.log('Noe feilet');
          }
      }
    );
  }

  getStockData(ticker, firstRes): Observable<string> {
    console.log('Ticker ' + ticker);
    return Observable.create((observer) => {
      observer.next(firstRes);
      observer.complete();
    });
  }

  doAsk(): Observable<string> {
    return Observable.create((observer) => {
      observer.next('bouvet.ol');
      observer.complete();
    });
  }

}
