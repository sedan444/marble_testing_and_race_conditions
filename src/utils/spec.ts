import { Observable } from 'rxjs/Observable';
import { TestScheduler, observableToBeFn, subscriptionLogsToBeFn } from 'rxjs/testing/TestScheduler';
import { SubscriptionLog } from 'rxjs/testing/SubscriptionLog';

declare const global: any;

let _rxTestScheduler = null;

export function rxTestScheduler(): any {
  return _rxTestScheduler;
}

export function resetRxTestScheduler(): any {
  _rxTestScheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
}

export function hot(marbles: string, values?: any, error?: any): Observable<any> {
  return rxTestScheduler().createHotObservable.apply(rxTestScheduler(), arguments);
}

export function cold(marbles: string, values?: any, error?: any): Observable<any> {
  return rxTestScheduler().createColdObservable.apply(rxTestScheduler(), arguments);
}

export function expectObservable(observable: Observable<any>,
                                 unsubscriptionMarbles: string = null): ({ toBe: observableToBeFn }) {
  return rxTestScheduler().expectObservable.apply(rxTestScheduler(), arguments);
}
