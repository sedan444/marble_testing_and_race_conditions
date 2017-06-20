import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { cold, expectObservable, resetRxTestScheduler, hot, rxTestScheduler } from 'utils/spec';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';

// marble testing
// https://egghead.io/lessons/rxjs-introduction-to-rxjs-marble-testing

describe('AppComponent', () => {
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent
  //     ],
  //   }).compileComponents();
  // }));

  beforeEach(() => {
    resetRxTestScheduler();
  });

  afterEach(() => {
    rxTestScheduler().flush();
  });

  // an example of a simple marble test
  it('marble test', () => {
    const one$ = cold('x-x|');
    const two$ = cold('-y|');

    expectObservable(one$.concat(two$)).toBe('x-x-y|');
    expectObservable(one$.merge(two$)).toBe('xyx|');
  });

  it('testing race condition', () => {
    const service = jasmine.createSpyObj('service', ['asyncOperation']);
    const appCmp = new AppComponent(service);

    service.asyncOperation.and.returnValue(cold('--a|'));
    appCmp.triggerAction(1);

    service.asyncOperation.and.returnValue(cold('-b|'));
    appCmp.triggerAction(2);

    rxTestScheduler().flush();

    expect(appCmp.id).toEqual(2);
    expect(appCmp.res).toEqual('b'); // this fails because of race condition
  });
});

function equal(a, b) { return a === b; }
